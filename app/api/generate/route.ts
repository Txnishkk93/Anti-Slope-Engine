import { NextRequest, NextResponse } from 'next/server';
import { SYSTEM_PROMPT } from '@/lib/document-generator';

export async function POST(request: NextRequest) {
  try {
    const { topic, intent, notes } = await request.json();

    if (!topic) {
      return NextResponse.json(
        { error: 'Topic is required' },
        { status: 400 }
      );
    }

    // Validate environment variables
    if (!process.env.OPENROUTER_API_KEY) {
      console.error('Missing OPENROUTER_API_KEY in environment');
      return NextResponse.json(
        { error: 'API key not configured. Please add OPENROUTER_API_KEY to .env.local' },
        { status: 500 }
      );
    }

    if (!process.env.LLM_MODEL) {
      console.error('Missing LLM_MODEL in environment');
      return NextResponse.json(
        { error: 'LLM model not configured. Please add LLM_MODEL to .env.local' },
        { status: 500 }
      );
    }

    const userInput = `Generate a ${intent} document about: ${topic}${notes ? `\n\nAdditional context: ${notes}` : ''}

CRITICAL REQUIREMENTS:
- Generate 7-10 sections (NOT fewer)
- Each section must have 5-7 content points (NOT less)
- Each content point must be 15-25 words of detailed analysis
- Write at expert-level analytical depth, not generic summaries
- Include trade-offs, reasoning, and specific examples

RESPOND WITH ONLY VALID JSON (no markdown, no explanations):
{
  "title": "string",
  "intent": "${intent}",
  "summary": "string (2-3 sentences)",
  "sections": [
    {
      "id": "sec_1",
      "type": "hero|list|stats|compare|timeline|quote",
      "heading": "specific, insight-driven heading",
      "content": ["point1 (15-25 words)", "point2 (15-25 words)", ...],
      "highlight": "one sharp, quotable takeaway"
    }
  ]
}`;

    console.log('Calling OpenRouter API with model:', process.env.LLM_MODEL);

    // OpenRouter API call with anti-slop system prompt
    const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: process.env.LLM_MODEL,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: userInput }
        ],
        temperature: Number(process.env.LLM_TEMPERATURE || '0.85'),
        top_p: Number(process.env.LLM_TOP_P || '0.95'),
        frequency_penalty: Number(process.env.LLM_FREQUENCY_PENALTY || '0.4'),
        presence_penalty: Number(process.env.LLM_PRESENCE_PENALTY || '0.6'),
        max_tokens: Number(process.env.LLM_MAX_TOKENS || '4000'),
      })
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error('OpenRouter API error:', res.status, errorText);
      throw new Error(`OpenRouter API error ${res.status}: ${errorText}`);
    }

    const data = await res.json();
    
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      console.error('Invalid response structure from OpenRouter:', data);
      throw new Error('Invalid response structure from OpenRouter API');
    }

    let content = data.choices[0].message.content;
    
    // Strip markdown code fences if present
    if (content.includes('```')) {
      content = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    }

    // Parse the JSON response from the LLM
    let document: any;
    try {
      document = JSON.parse(content);
    } catch (parseError) {
      console.error('Failed to parse LLM JSON response:', content);
      throw new Error(`LLM response was not valid JSON: ${String(parseError)}`);
    }

    // Validate required fields
    if (!document.title || !document.summary || !document.sections || !Array.isArray(document.sections)) {
      console.error('Missing required fields in document:', document);
      throw new Error('Generated document missing required fields (title, summary, sections)');
    }

    return NextResponse.json({
      title: document.title,
      intent: document.intent,
      summary: document.summary,
      sections: document.sections,
      metadata: {
        topic,
        intent,
        generatedAt: new Date().toISOString(),
        model: process.env.LLM_MODEL,
      },
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Generate error:', errorMessage, error);
    
    return NextResponse.json(
      { 
        error: errorMessage,
        details: process.env.NODE_ENV === 'development' ? String(error) : undefined
      },
      { status: 500 }
    );
  }
}

/**
 * Generate mock sections following anti-slop rules
 * (Kept for reference/fallback if needed)
 */
function generateMockSections(
  topic: string,
  variation: { sectionTypes: string[]; structure: string; tone: string }
) {
  interface SectionTemplate {
    id: string;
    type: string;
    heading: string;
    content: string[];
    highlight: string;
  }
  
  const templates: Record<string, (topic: string) => SectionTemplate> = {
    hero: (t: string) => ({
      id: 'sec_hero',
      type: 'hero',
      heading: `${t}: The Reality`,
      content: [
        'Core mechanics often misunderstood',
        'Market incentives hidden by default',
        'Real winners differ from perception',
      ],
      highlight: 'What the trend really means.',
    }),

    list: (t: string) => ({
      id: 'sec_insights',
      type: 'list',
      heading: `Why ${t} Keeps Failing Short`,
      content: [
        'Implementation without strategy burns resources',
        'Teams skip foundational understanding',
        'Metrics focus on output, not outcome',
        'Feedback loops arrive too late',
        'Success rarely looks like predictions',
      ],
      highlight: 'The gap between theory and execution.',
    }),

    stats: (t: string) => ({
      id: 'sec_data',
      type: 'stats',
      heading: `${t} By Numbers`,
      content: [
        '67%\nAdoption blocked by adoption',
        '3.2x\nCost overruns typical',
        '18mo\nAverage payback period',
        '41%\nActual vs planned results',
      ],
      highlight: 'Data points that matter.',
    }),

    compare: (t: string) => ({
      id: 'sec_compare',
      type: 'compare',
      heading: `Evolution of ${t}`,
      content: [
        'Old: Manual, slow, prone to error.',
        'New: Automated, real-time, self-correcting.',
        'Legacy: Siloed teams, competing targets.',
        'Modern: Cross-functional, unified goals.',
        'Before: Reactive crisis management.',
        'Now: Predictive, proactive optimization.',
      ],
      highlight: 'How the landscape shifted fundamentally.',
    }),

    timeline: (t: string) => ({
      id: 'sec_timeline',
      type: 'timeline',
      heading: `Building with ${t}: Realistic Timeline`,
      content: [
        'Week 1–2: Audit current state and constraints.',
        'Week 3–4: Small pilot with real data.',
        'Week 5–8: Scale to next tier with measured expansion.',
        'Week 9+: Optimize based on actual results.',
      ],
      highlight: 'Phased approach beats Big Bang rollout.',
    }),

    quote: (t: string) => ({
      id: 'sec_quote',
      type: 'quote',
      heading: `Most ${t} initiatives fail because teams optimize for activity, not outcome.`,
      content: [
        'Measure what matters, not what\'s easy.',
        'Culture beats tools every time.',
        'Speed without direction is waste.',
      ],
      highlight: 'The uncomfortable truth.',
    }),
  };

  // Map section types to templates and shuffle
  const shuffled = (variation.sectionTypes as string[])
    .slice(0, 4 + Math.floor(Math.random() * 2))
    .map((type) => {
      const template = templates[type];
      if (!template) {
        return templates.list(topic); // Fallback
      }
      return template(topic);
    });

  // Add unique IDs
  return shuffled.map((section, idx) => ({
    ...section,
    id: `sec_${idx}`,
  }));
}

/**
 * Generate concise, punchy summary
 */
function generateSummary(topic: string): string {
  const summaries = [
    `${topic} works differently than most assume. Success requires rethinking fundamentals.`,
    `Most ${topic} implementations overlook the constraint that matters most.`,
    `${topic} is less about adoption, more about sustained competitive advantage.`,
    `The ${topic} landscape shifted. Old playbooks no longer apply.`,
    `${topic} only works when teams stop optimizing for activity.`,
  ];

  return summaries[Math.floor(Math.random() * summaries.length)];
}

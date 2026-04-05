import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { topic, intent, notes } = await request.json();

    if (!topic) {
      return NextResponse.json(
        { error: 'Topic is required' },
        { status: 400 }
      );
    }

    // Mock response with structured sections
    const mockSections = [
      {
        id: 'sec_1',
        type: 'hero',
        heading: `What ${topic} Actually Is`,
        content: [
          `${topic} fundamentals`,
          'Market overview',
          'Growth potential'
        ],
        highlight: `Understanding the core of ${topic} and its key characteristics`
      },
      {
        id: 'sec_2',
        type: 'list',
        heading: 'Key Points',
        content: [
          `${topic} drives innovation and growth in modern businesses`,
          'It impacts strategy, planning, and competitive advantage',
          'Implementation requires careful consideration and expertise',
          'Success depends on understanding evolving trends',
          'Continuous measurement and optimization are essential'
        ],
        highlight: 'Essential aspects to consider about this topic'
      },
      {
        id: 'sec_3',
        type: 'stats',
        heading: 'By The Numbers',
        content: [
          '$2.5B\nMarket Size',
          '45%\nGrowth Rate',
          '78%\nAdoption Rate',
          '3.2x\nROI Impact'
        ],
        highlight: 'Current market metrics and projections'
      },
      {
        id: 'sec_4',
        type: 'compare',
        heading: 'Comparative Analysis',
        content: [
          'Traditional approach: Time-intensive, high manual effort',
          'Modern solution: Automated, efficient, scalable',
          'Legacy systems: Limited integration capabilities',
          'New platforms: Full ecosystem integration',
          'Old methodology: Reactive approach',
          'Current best practice: Proactive strategy'
        ],
        highlight: 'How approaches differ in today\'s landscape'
      },
      {
        id: 'sec_5',
        type: 'timeline',
        heading: 'Implementation Timeline',
        content: [
          'Phase 1: Assessment & Planning (Weeks 1-2) - Evaluate current state and set goals',
          'Phase 2: Pilot & Testing (Weeks 3-6) - Test with limited scope and gather feedback',
          'Phase 3: Full Deployment (Weeks 7-10) - Roll out to complete organization',
          'Phase 4: Optimization (Weeks 11+) - Monitor, measure, and continuously improve'
        ],
        highlight: 'Structured approach to successful implementation'
      },
      {
        id: 'sec_6',
        type: 'quote',
        heading: 'Success requires understanding the fundamentals and committing to continuous improvement.',
        content: [
          'Build strong foundational knowledge',
          'Invest in the right tools and talent',
          'Create feedback loops for improvement'
        ],
        highlight: 'The path forward combines strategy, execution, and adaptation'
      }
    ];

    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 800));

    return NextResponse.json({
      sections: mockSections,
      metadata: {
        topic,
        intent,
        generatedAt: new Date().toISOString()
      }
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to generate document' },
      { status: 500 }
    );
  }
}

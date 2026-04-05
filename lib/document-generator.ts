import { SYSTEM_PROMPT } from '@/lib/prompts';

export type Intent = 'report' | 'deck' | 'blog' | 'explainer';
export type SectionType = 'hero' | 'list' | 'stats' | 'compare' | 'timeline' | 'quote';

export interface Section {
  id: string;
  type: SectionType;
  heading: string;
  content: string[];
  highlight: string;
}

export interface GeneratedDocument {
  title: string;
  intent: Intent;
  summary: string;
  sections: Section[];
}

/**
 * Anti-slop content generation utilities
 * Follows the system prompt guidelines for high-quality output
 */

// Banned phrases to avoid
const BANNED_PHRASES = [
  'in today\'s world',
  'in conclusion',
  'furthermore',
  'moreover',
  'it is important to note',
  'leverage',
  'utilize',
  'game-changer',
];

/**
 * Validates content against anti-slop and depth rules
 */
export function validateContent(sections: Section[]): boolean {
  // Require 7-10 sections for depth
  if (sections.length < 7 || sections.length > 10) {
    console.warn(`Expected 7-10 sections, got ${sections.length}`);
    return false;
  }

  return sections.every((section) => {
    // Require 5-7 items per section for substantive content
    if (section.content.length < 5 || section.content.length > 7) {
      console.warn(`Section "${section.heading}": expected 5-7 items, got ${section.content.length}`);
      return false;
    }

    // Check each item: 15-25 words for analytical depth
    return section.content.every((item) => {
      const wordCount = item.trim().split(/\s+/).length;
      if (wordCount < 15 || wordCount > 25) {
        console.warn(`Item has ${wordCount} words, expected 15-25: "${item.substring(0, 50)}..."`);
        return false;
      }
      return true;
    });
  });
}

/**
 * Checks for banned phrases
 */
export function hasBannedPhrases(text: string): boolean {
  const lower = text.toLowerCase();
  return BANNED_PHRASES.some((phrase) => lower.includes(phrase));
}

/**
 * Generates a random variation seed to ensure section diversity
 */
export function getVariationPattern(): {
  sectionTypes: SectionType[];
  structure: string;
  tone: string;
} {
  const allTypes: SectionType[] = [
    'hero',
    'list',
    'stats',
    'compare',
    'timeline',
    'quote',
  ];
  const structures = [
    'insight-first',
    'data-first',
    'problem-first',
    'contrarian-take',
    'timeline-narrative',
    'comparison-driven',
  ];
  const tones = ['analytical', 'bold', 'minimal', 'storytelling'];

  // Shuffle array
  const shuffle = <T,>(arr: T[]) => arr.sort(() => Math.random() - 0.5);

  return {
    sectionTypes: shuffle([...allTypes]).slice(0, 4 + Math.floor(Math.random() * 3)),
    structure: structures[Math.floor(Math.random() * structures.length)],
    tone: tones[Math.floor(Math.random() * tones.length)],
  };
}

export { SYSTEM_PROMPT };

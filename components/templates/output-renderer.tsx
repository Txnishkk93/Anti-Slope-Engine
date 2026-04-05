'use client';

import { HeroTemplate, HeroData } from './hero-template';
import { ListTemplate, ListData } from './list-template';
import { StatTemplate, StatData } from './stat-template';
import { CompareTemplate, CompareData } from './compare-template';
import { TimelineTemplate, TimelineData } from './timeline-template';
import { QuoteTemplate, QuoteData } from './quote-template';

type TemplateData = HeroData | ListData | StatData | CompareData | TimelineData | QuoteData;

interface OutputRendererProps {
  sections: TemplateData[];
}

export function OutputRenderer({ sections }: OutputRendererProps) {
  if (!sections || sections.length === 0) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded p-8 h-96 flex items-center justify-center text-gray-500 text-center">
        <p>No content to render</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {sections.map((section) => {
        switch (section.type) {
          case 'hero':
            return <HeroTemplate key={section.id} data={section as HeroData} />;
          case 'list':
            return <ListTemplate key={section.id} data={section as ListData} />;
          case 'stats':
            return <StatTemplate key={section.id} data={section as StatData} />;
          case 'compare':
            return <CompareTemplate key={section.id} data={section as CompareData} />;
          case 'timeline':
            return <TimelineTemplate key={section.id} data={section as TimelineData} />;
          case 'quote':
            return <QuoteTemplate key={section.id} data={section as QuoteData} />;
          default:
            return null;
        }
      })}
    </div>
  );
}

import { Card } from '@/components/ui/card';

export interface HeroData {
  id: string;
  type: 'hero';
  heading: string;
  content: string[];
  highlight: string;
}

interface HeroTemplateProps {
  data: HeroData;
}

export function HeroTemplate({ data }: HeroTemplateProps) {
  return (
    <div className="bg-gray-900 text-white py-16 px-6 rounded-lg">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">{data.heading}</h1>
        
        <Card className="bg-gray-800 border-gray-700 p-6 mb-6">
          <p className="text-lg text-gray-100 leading-relaxed">
            {data.highlight}
          </p>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {data.content.map((item, idx) => (
            <div
              key={idx}
              className="bg-gray-800 border border-gray-700 rounded p-4 text-center"
            >
              <p className="text-gray-300 text-sm">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

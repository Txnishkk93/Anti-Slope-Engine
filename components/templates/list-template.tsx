import { CheckCircle2 } from 'lucide-react';

export interface ListData {
  id: string;
  type: 'list';
  heading: string;
  content: string[];
  highlight: string;
}

interface ListTemplateProps {
  data: ListData;
}

export function ListTemplate({ data }: ListTemplateProps) {
  return (
    <div className="py-8 px-6">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{data.heading}</h2>
        <p className="text-gray-600 mb-6">{data.highlight}</p>

        <ul className="space-y-3">
          {data.content.map((item, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-gray-900 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

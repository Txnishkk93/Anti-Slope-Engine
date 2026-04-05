export interface StatData {
  id: string;
  type: 'stats';
  heading: string;
  content: string[];
  highlight: string;
}

interface StatTemplateProps {
  data: StatData;
}

export function StatTemplate({ data }: StatTemplateProps) {
  return (
    <div className="py-12 px-6 bg-gray-50 rounded-lg">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{data.heading}</h2>
        <p className="text-gray-600 mb-8">{data.highlight}</p>

        <div className="grid grid-cols-2 md:grid-cols-2 gap-6">
          {data.content.map((item, idx) => (
            <div key={idx} className="bg-white border border-gray-200 rounded-lg p-6 text-center">
              <p className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                {item.split('\n')[0]}
              </p>
              <p className="text-sm text-gray-600">
                {item.split('\n').slice(1).join(' ')}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

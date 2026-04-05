export interface CompareData {
  id: string;
  type: 'compare';
  heading: string;
  content: string[];
  highlight: string;
}

interface CompareTemplateProps {
  data: CompareData;
}

export function CompareTemplate({ data }: CompareTemplateProps) {
  const [leftItems, rightItems] = [
    data.content.slice(0, Math.ceil(data.content.length / 2)),
    data.content.slice(Math.ceil(data.content.length / 2))
  ];

  return (
    <div className="py-8 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{data.heading}</h2>
        <p className="text-gray-600 mb-8">{data.highlight}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 pb-3 border-b-2 border-gray-900">
              Option A
            </h3>
            <ul className="space-y-3">
              {leftItems.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-gray-900 font-bold mt-0.5">→</span>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 pb-3 border-b-2 border-gray-400">
              Option B
            </h3>
            <ul className="space-y-3">
              {rightItems.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-gray-900 font-bold mt-0.5">→</span>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

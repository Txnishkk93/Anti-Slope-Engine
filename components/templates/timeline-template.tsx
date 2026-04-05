export interface TimelineData {
  id: string;
  type: 'timeline';
  heading: string;
  content: string[];
  highlight: string;
}

interface TimelineTemplateProps {
  data: TimelineData;
}

export function TimelineTemplate({ data }: TimelineTemplateProps) {
  return (
    <div className="py-8 px-6">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{data.heading}</h2>
        <p className="text-gray-600 mb-8">{data.highlight}</p>

        <div className="relative">
          {/* Central line */}
          <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gray-300"></div>

          {/* Timeline items */}
          <div className="space-y-6">
            {data.content.map((item, idx) => (
              <div key={idx} className="flex gap-6">
                {/* Circle marker */}
                <div className="relative flex-shrink-0">
                  <div className="w-11 h-11 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm font-bold border-4 border-white relative z-10 shadow-md">
                    {idx + 1}
                  </div>
                </div>

                {/* Content */}
                <div className="pt-1">
                  <p className="text-gray-700 leading-relaxed">{item}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

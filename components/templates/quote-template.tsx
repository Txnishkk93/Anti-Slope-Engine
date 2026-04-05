export interface QuoteData {
  id: string;
  type: 'quote';
  heading: string;
  content: string[];
  highlight: string;
}

interface QuoteTemplateProps {
  data: QuoteData;
}

export function QuoteTemplate({ data }: QuoteTemplateProps) {
  return (
    <div className="py-12 px-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex gap-6">
          {/* Highlight bar */}
          <div className="w-1 bg-gray-900 rounded-full flex-shrink-0"></div>

          <div>
            <blockquote className="border-l-4 border-gray-900 pl-6 py-2">
              <p className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">
                "{data.heading}"
              </p>
              <p className="text-gray-600 mb-4">{data.highlight}</p>

              {data.content.length > 0 && (
                <div className="mt-6 space-y-2">
                  {data.content.map((item, idx) => (
                    <p key={idx} className="text-sm text-gray-500">
                      • {item}
                    </p>
                  ))}
                </div>
              )}
            </blockquote>
          </div>
        </div>
      </div>
    </div>
  );
}

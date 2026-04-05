'use client';

import { useState } from 'react';
import Link from 'next/link';
import { OutputRenderer } from '@/components/templates/output-renderer';
import { Loader2 } from 'lucide-react';

type DocumentType = 'report' | 'blog' | 'presentation' | 'explainer';

interface Section {
  id: string;
  type: 'hero' | 'list' | 'stats' | 'compare' | 'timeline' | 'quote';
  heading: string;
  content: string[];
  highlight: string;
}

export default function Generator() {
  const [topic, setTopic] = useState('');
  const [notes, setNotes] = useState('');
  const [docType, setDocType] = useState<DocumentType>('report');
  const [isLoading, setIsLoading] = useState(false);
  const [sections, setSections] = useState<Section[]>([]);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    if (!topic.trim()) {
      setError('Please enter a topic');
      return;
    }

    setError('');
    setIsLoading(true);
    setSections([]);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          topic: topic.trim(),
          intent: docType,
          notes: notes.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate document');
      }

      const data = await response.json();
      setSections(data.sections);
    } catch (err) {
      setError('Failed to generate document. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (sections.length === 0) return;

    const text = sections
      .map(
        (section) =>
          `${section.heading}\n${section.highlight}\n${section.content.join('\n')}`
      )
      .join('\n\n---\n\n');

    const element = document.createElement('a');
    const file = new Blob([text], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${topic.replace(/\s+/g, '-').toLowerCase()}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleCopy = () => {
    if (sections.length === 0) return;

    const text = sections
      .map(
        (section) =>
          `${section.heading}\n${section.highlight}\n${section.content.join('\n')}`
      )
      .join('\n\n---\n\n');

    navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 bg-white border-b border-gray-200 z-50">
        <nav className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="text-lg font-bold text-gray-900">
            Anti-Slop Engine
          </Link>
          <Link href="/" className="text-gray-600 hover:text-gray-900 text-sm">
            Back to Home
          </Link>
        </nav>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Panel */}
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Generate Document</h1>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Document Type
              </label>
              <select
                value={docType}
                onChange={(e) => setDocType(e.target.value as DocumentType)}
                className="w-full px-3 py-2 border border-gray-300 rounded bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400"
              >
                <option value="report">Report</option>
                <option value="blog">Blog Post</option>
                <option value="presentation">Presentation</option>
                <option value="explainer">Explainer</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Topic *
              </label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g., Machine Learning in Healthcare"
                className="w-full px-3 py-2 border border-gray-300 rounded bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Notes (Optional)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add any specific points or context you want included..."
                rows={5}
                className="w-full px-3 py-2 border border-gray-300 rounded bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 resize-none"
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded p-3 text-red-800 text-sm">
                {error}
              </div>
            )}

            <button
              onClick={handleGenerate}
              disabled={isLoading}
              className="w-full bg-gray-900 text-white py-3 rounded font-medium hover:bg-gray-800 disabled:bg-gray-400 transition flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Generating...
                </>
              ) : (
                'Generate Document'
              )}
            </button>
          </div>

          {/* Output Panel */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">Preview</h2>

            {sections.length > 0 ? (
              <div className="space-y-4">
                <div className="border border-gray-200 rounded max-h-96 overflow-y-auto">
                  <OutputRenderer sections={sections} />
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={handleCopy}
                    className="flex-1 bg-gray-200 text-gray-900 py-2 rounded font-medium hover:bg-gray-300 transition"
                  >
                    Copy
                  </button>
                  <button
                    onClick={handleDownload}
                    className="flex-1 bg-gray-900 text-white py-2 rounded font-medium hover:bg-gray-800 transition"
                  >
                    Download
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-gray-50 border border-gray-200 rounded p-8 h-96 flex items-center justify-center text-gray-500 text-center">
                {isLoading ? (
                  <div>
                    <div className="flex justify-center mb-4">
                      <Loader2 className="w-8 h-8 animate-spin text-gray-900" />
                    </div>
                    <p>Generating your document...</p>
                  </div>
                ) : (
                  <p>
                    Fill in your topic and click "Generate Document" to see the
                    preview here.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
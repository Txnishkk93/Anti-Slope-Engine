'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 bg-white border-b border-gray-200 z-50">
        <nav className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-gray-900">
            Anti-Slop Engine
          </Link>
          <div className="flex gap-4">
            <Link href="#features" className="text-gray-600 hover:text-gray-900 text-sm">
              Features
            </Link>
            <Link href="/generator" className="text-gray-600 hover:text-gray-900 text-sm">
              Generator
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="px-4 sm:px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Generate Quality Documents
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Stop wasting time rewriting AI output. Get structured, high-quality documents without the generic filler.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/generator"
              className="bg-gray-900 text-white px-6 py-3 rounded font-medium hover:bg-gray-800 transition"
            >
              Start Generating
            </Link>
            <Link 
              href="#features"
              className="bg-gray-100 text-gray-900 px-6 py-3 rounded font-medium hover:bg-gray-200 transition"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-4 sm:px-6 py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">1. Input Your Topic</h3>
              <p className="text-gray-600">
                Provide your topic, notes, or document. Tell us what you need: report, blog, presentation, or more.
              </p>
            </div>
            <div className="bg-white p-6 rounded border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">2. AI Generates Structure</h3>
              <p className="text-gray-600">
                Our anti-slop prompts ensure high-quality, dense content with zero filler phrases.
              </p>
            </div>
            <div className="bg-white p-6 rounded border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">3. Beautiful Output</h3>
              <p className="text-gray-600">
                Get a professionally formatted document ready to use or edit. No bloat, pure quality.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 sm:px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Generate Quality Content?
          </h2>
          <p className="text-gray-600 mb-8">
            Start now and experience the difference quality-controlled AI output makes.
          </p>
          <Link 
            href="/generator"
            className="inline-block bg-gray-900 text-white px-8 py-3 rounded font-medium hover:bg-gray-800 transition"
          >
            Open Generator
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-8 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center text-sm text-gray-600">
          <p>AI Anti-Slop Engine • Quality-Controlled Document Generation</p>
        </div>
      </footer>
    </div>
  );
}

import React from 'react';

const AccessibilityPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white py-16 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="space-y-3 text-center">
          <p className="text-sm uppercase tracking-[0.4em] text-blue-300">Legal</p>
          <h1 className="text-4xl font-bold">Accessibility Statement</h1>
          <p className="text-slate-300">Aligned with WCAG 2.1 AA and the Korean Web Content Accessibility Guidelines (K-WCAG 2.1).</p>
        </header>

        <section className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-3">
          <h2 className="text-2xl font-semibold">Commitment</h2>
          <p className="text-slate-300">
            Multiversity ensures equal access for learners, researchers, and educators. We audit quarterly against K-WCAG 2.1 and WCAG 2.1 AA
            checkpoints, testing both keyboard navigation and screen reader output (NVDA + Korean TTS).
          </p>
        </section>

        <section className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-3">
          <h2 className="text-2xl font-semibold">Recent Improvements</h2>
          <ul className="list-disc list-inside text-slate-300 space-y-2">
            <li>Contrast ratios verified for new monochrome buttons.</li>
            <li>ARIA labels added to timeline charts and comparison controls.</li>
            <li>Caption options for narration and audio cues.</li>
          </ul>
        </section>

        <section className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-3">
          <h2 className="text-2xl font-semibold">Request Assistance</h2>
          <p className="text-slate-300">
            Email <a href="mailto:accessibility@multiversity.vercel.app" className="text-blue-300 underline">accessibility@multiversity.vercel.app</a> to
            report a barrier or request content in an alternative format. We respond within five business days per Article 22 of the Act on
            Welfare of Persons with Disabilities.
          </p>
        </section>
      </div>
    </div>
  );
};

export default AccessibilityPage;

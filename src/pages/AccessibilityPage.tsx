import React from 'react';

const AccessibilityPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white py-16 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="space-y-3 text-center">
          <p className="text-sm uppercase tracking-[0.4em] text-blue-300">Legal</p>
          <h1 className="text-4xl font-bold">Accessibility Statement</h1>
          <p className="text-slate-300">Aligned with WCAG 2.1 AA standards.</p>
        </header>

        <section className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-3">
          <h2 className="text-2xl font-semibold">Commitment</h2>
          <p className="text-slate-300">
            Multiversity ensures equal access for learners, researchers, and educators. We strive to adhere to WCAG 2.1 AA
            guidelines, testing keyboard navigation and screen reader compatibility to ensure a seamless experience for all users.
          </p>
        </section>

        <section className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-3">
          <h2 className="text-2xl font-semibold">Recent Improvements</h2>
          <ul className="list-disc list-inside text-slate-300 space-y-2">
            <li>High contrast color scheme for improved readability.</li>
            <li>Alternative text provided for all chapter and timeline images.</li>
            <li>Keyboard navigation support for all interactive elements.</li>
            <li>Semantic HTML structure for better screen reader navigation.</li>
          </ul>
        </section>

        <section className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-3">
          <h2 className="text-2xl font-semibold">Request Assistance</h2>
          <p className="text-slate-300">
            Email <a href="mailto:accessibility@multiversity.netlify.app" className="text-blue-300 underline">accessibility@multiversity.netlify.app</a> to
            report a barrier or request content in an alternative format. We aim to respond within five business days.
          </p>
        </section>
      </div>
    </div>
  );
};

export default AccessibilityPage;

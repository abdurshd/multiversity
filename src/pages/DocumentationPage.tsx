import React from 'react';

const DocumentationPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white py-16 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-10">
        <header className="space-y-4 text-center">
          <p className="text-sm uppercase tracking-[0.4em] text-blue-300">Resources</p>
          <h1 className="text-4xl font-bold">Multiversity Documentation</h1>
          <p className="text-slate-300">
            Architecture, data curation workflow, and regional compliance details for building alternate history timelines.
          </p>
        </header>

        <section className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
          <h2 className="text-2xl font-semibold">Platform Overview</h2>
          <p className="text-slate-300">
            Multiversity is a Vite + React 19 single-page application that fetches timeline data from local TypeScript modules.
            Global state is managed with lightweight hooks and memoized selectors so timelines render efficiently even with dozens
            of events. Animations are powered by Framer Motion and D3 is used to paint comparison charts.
          </p>
        </section>

        <section className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
          <h2 className="text-2xl font-semibold">Data Governance & South Korean Compliance</h2>
          <p className="text-slate-300">
            Historical scenarios do not rely on personal data, yet we still follow the Personal Information Protection Act (PIPA) of
            the Republic of Korea. When users submit feedback, personally identifiable data is encrypted at rest, stored inside the
            Seoul (ap-northeast-2) region, and deleted upon verified request. Content hosting complies with the Telecommunications
            Business Act and all age-related interactive modules follow the Youth Protection Act.
          </p>
          <ul className="list-disc list-inside text-slate-300 space-y-2">
            <li>PIPA Articles 17-22 guide consent and purpose limitation when we collect analytics.</li>
            <li>Records of user consent and disclosure requests are retained for three years, aligning with the Electronic Commerce Act.</li>
            <li>All map layers are sourced from open-data portals cleared by the National Spatial Data Infrastructure Act.</li>
          </ul>
        </section>

        <section className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
          <h2 className="text-2xl font-semibold">Content Workflow</h2>
          <ol className="list-decimal list-inside text-slate-300 space-y-2">
            <li>Primary research using national archives and university papers.</li>
            <li>Scenario drafting with historian review and metadata tagging.</li>
            <li>Localization pass to ensure terminology respects Korean language norms where relevant.</li>
            <li>Compliance check confirming no restricted imagery (per National Security Law) is shown without context.</li>
          </ol>
        </section>
      </div>
    </div>
  );
};

export default DocumentationPage;

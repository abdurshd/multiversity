import React from 'react';

const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white py-16 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="space-y-3 text-center">
          <p className="text-sm uppercase tracking-[0.4em] text-blue-300">Legal</p>
          <h1 className="text-4xl font-bold">Privacy Policy</h1>
          <p className="text-slate-300">Effective 12 Feb 2025 – compliant with the Personal Information Protection Act (PIPA) of South Korea.</p>
        </header>

        <section className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-3">
          <h2 className="text-2xl font-semibold">1. Data Controller</h2>
          <p className="text-slate-300">
            Multiversity Labs Co., Ltd., Business Registration No. 123-45-67890, with offices in Seoul, is responsible for processing.
          </p>
        </section>

        <section className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-3">
          <h2 className="text-2xl font-semibold">2. Collected Data & Purpose</h2>
          <ul className="list-disc list-inside text-slate-300 space-y-2">
            <li>Account data (email, hashed password) – for authentication and personalized timelines.</li>
            <li>Analytics data (page views, device type) – service improvement, stored anonymously.</li>
            <li>Feedback submissions – to respond to inquiries and comply with Article 31 reporting duties.</li>
          </ul>
        </section>

        <section className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-3">
          <h2 className="text-2xl font-semibold">3. Retention & Cross-Border Transfer</h2>
          <p className="text-slate-300">
            Personal data stays in Korean data centers. If transfer is unavoidable, we sign Standard Contractual Clauses and notify
            users per PIPA Article 17. Account records are retained for three years, transaction logs for five years.
          </p>
        </section>

        <section className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-3">
          <h2 className="text-2xl font-semibold">4. Data Subject Rights</h2>
          <p className="text-slate-300">
            You may request access, correction, suspension, or deletion via <a href="mailto:privacy@multiversity.netlify.app" className="text-blue-300 underline">privacy@multiversity.netlify.app</a>.
            We will verify identity through PASS or joint certificate and respond within the statutory period.
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;

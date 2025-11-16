import React from 'react';

const SupportPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white py-16 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-10">
        <header className="space-y-3 text-center">
          <p className="text-sm uppercase tracking-[0.4em] text-blue-300">Contact</p>
          <h1 className="text-4xl font-bold">Support & Compliance</h1>
          <p className="text-slate-300">
            Get help with the app, data requests, or legal questions within the Republic of Korea.
          </p>
        </header>

        <section className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
          <h2 className="text-2xl font-semibold">Contact Channels</h2>
          <ul className="space-y-3 text-slate-300">
            <li>Email: <a href="mailto:support@multiversity.vercel.app" className="text-blue-300 underline">support@multiversity.vercel.app</a></li>
            <li>Phone (KST business hours): +82-2-1234-5678</li>
            <li>Office: 12F, Jongno Tower, Jongno-gu, Seoul, Republic of Korea</li>
          </ul>
        </section>

        <section className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
          <h2 className="text-2xl font-semibold">Regulatory Requests</h2>
          <p className="text-slate-300">
            For privacy access, correction, or deletion requests we follow PIPA Article 35-37 procedures. Submit the
            subject access form along with digital identification verified through PASS or an accredited certificate.
            We respond within ten business days as required by the Enforcement Decree.
          </p>
          <p className="text-slate-300">
            Takedown requests referencing Article 44-2 of the Information and Communications Network Act are escalated to our
            compliance officer and logged for at least six months.
          </p>
        </section>
      </div>
    </div>
  );
};

export default SupportPage;

import React from 'react';

const TermsOfServicePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white py-16 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="space-y-3 text-center">
          <p className="text-sm uppercase tracking-[0.4em] text-blue-300">Legal</p>
          <h1 className="text-4xl font-bold">Terms of Service</h1>
          <p className="text-slate-300">These terms govern your use of Multiversity in accordance with South Korean law.</p>
        </header>

        <section className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-3">
          <h2 className="text-2xl font-semibold">1. Eligibility & Account</h2>
          <p className="text-slate-300">
            Users must be 14 or older, reflecting the Youth Protection Act. Creating an account indicates acceptance of these terms and
            acknowledgement that your data may be processed domestically.
          </p>
        </section>

        <section className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-3">
          <h2 className="text-2xl font-semibold">2. Acceptable Use</h2>
          <p className="text-slate-300">
            You agree not to upload unlawful material or content violating the National Security Law or the Act on Promotion of Information
            and Communications Network Utilization. Educational use is encouraged, but commercial redistribution requires a written license.
          </p>
        </section>

        <section className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-3">
          <h2 className="text-2xl font-semibold">3. Paid Services & Refunds</h2>
          <p className="text-slate-300">
            Subscription fees follow the Electronic Commerce Act; customers may cancel within seven days unless significant value has
            already been delivered (e.g., download of exclusive datasets). Refunds are processed in KRW.
          </p>
        </section>

        <section className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-3">
          <h2 className="text-2xl font-semibold">4. Governing Law</h2>
          <p className="text-slate-300">
            These terms are governed by the laws of the Republic of Korea. Disputes shall be submitted to the Seoul Central District Court.
          </p>
        </section>
      </div>
    </div>
  );
};

export default TermsOfServicePage;

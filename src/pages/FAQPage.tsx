import React from 'react';

const FAQPage: React.FC = () => {
  const faqs = [
    {
      question: 'How accurate are the timelines?',
      answer:
        'Each divergence is peer reviewed by at least two historians and a regional expert. We cite primary sources in our internal CMS and follow the Korean Fair Labeling and Advertising Act when describing hypothetical outcomes.'
    },
    {
      question: 'Do you collect personal data?',
      answer:
        'Only minimal analytics (page views and anonymous device info) are collected. If you create an account, we store your email address on infrastructure hosted in South Korea or equivalent jurisdictions and process it under PIPA consent rules.'
    },
    {
      question: 'Can educators reuse the material?',
      answer:
        'Yes. Our classroom packets are released under a Creative Commons BY-NC license. When distributing in South Korea, please include our company registration number as required by the Electronic Commerce Act.'
    },
    {
      question: 'How do you handle takedown requests?',
      answer:
        'Requests citing defamation, copyright, or National Security Law concerns can be submitted via the Support page. We respond within 72 hours in accordance with the Korean Communications Standards Commission guidelines.'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white py-16 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto space-y-8">
        <header className="space-y-3 text-center">
          <p className="text-sm uppercase tracking-[0.4em] text-blue-300">Resources</p>
          <h1 className="text-4xl font-bold">Frequently Asked Questions</h1>
          <p className="text-slate-300">Answers for researchers, educators, and South Korean partners.</p>
        </header>

        <div className="space-y-4">
          {faqs.map((item) => (
            <div key={item.question} className="bg-white/5 border border-white/10 rounded-2xl p-5">
              <h2 className="text-xl font-semibold mb-2">{item.question}</h2>
              <p className="text-slate-300">{item.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQPage;

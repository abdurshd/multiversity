import React from 'react';
import { useTranslation } from 'react-i18next';

const FAQPage: React.FC = () => {
  const { t } = useTranslation('pages-faq');
  const faqs = t('faqs', { returnObjects: true }) as Array<{question: string; answer: string}>;

  return (
    <div className="min-h-screen bg-slate-950 text-white py-16 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto space-y-8">
        <header className="space-y-3 text-center">
          <p className="text-sm uppercase tracking-[0.4em] text-blue-300">{t('header.category')}</p>
          <h1 className="text-4xl font-bold">{t('header.title')}</h1>
          <p className="text-slate-300">{t('header.subtitle')}</p>
        </header>

        <div className="space-y-4">
          {faqs.map((item, index) => (
            <div key={index} className="bg-white/5 border border-white/10 rounded-2xl p-5">
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

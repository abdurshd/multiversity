import React from 'react';
import { useTranslation } from 'react-i18next';

const AccessibilityPage: React.FC = () => {
  const { t } = useTranslation('pages-accessibility');
  const sections = t('sections', { returnObjects: true }) as Array<{title: string; content?: string; list?: string[]; email?: string}>;

  return (
    <div className="min-h-screen bg-slate-950 text-white py-16 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="space-y-3 text-center">
          <p className="text-sm uppercase tracking-[0.4em] text-blue-300">{t('header.category')}</p>
          <h1 className="text-4xl font-bold">{t('header.title')}</h1>
          <p className="text-slate-300">{t('header.subtitle')}</p>
        </header>

        {sections.map((section, index) => (
          <section key={index} className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-3">
            <h2 className="text-2xl font-semibold">{section.title}</h2>
            {section.content && (
              <p className="text-slate-300">
                {section.email ? (
                  <>
                    Email <a href={`mailto:${section.email}`} className="text-blue-300 underline">{section.email}</a> to
                    report a barrier or request content in an alternative format. We aim to respond within five business days.
                  </>
                ) : (
                  section.content
                )}
              </p>
            )}
            {section.list && (
              <ul className="list-disc list-inside text-slate-300 space-y-2">
                {section.list.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>
    </div>
  );
};

export default AccessibilityPage;

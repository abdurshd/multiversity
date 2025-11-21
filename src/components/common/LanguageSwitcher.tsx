import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

const LanguageSwitcher: React.FC = () => {
    const { i18n } = useTranslation();

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };

    return (
        <div className="relative group">
            <button className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors">
                <Globe className="w-4 h-4" />
                <span>{i18n.language === 'uz' ? 'O\'zbek' : 'English'}</span>
            </button>
            <div className="absolute right-0 pt-2 w-32 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="bg-white dark:bg-slate-800 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                    <div className="py-1">
                        <button
                            onClick={() => changeLanguage('en')}
                            className={`block w-full text-left px-4 py-2 text-sm ${i18n.language === 'en'
                                ? 'bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white'
                                : 'text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700'
                                }`}
                        >
                            English
                        </button>
                        <button
                            onClick={() => changeLanguage('uz')}
                            className={`block w-full text-left px-4 py-2 text-sm ${i18n.language === 'uz'
                                ? 'bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white'
                                : 'text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700'
                                }`}
                        >
                            O'zbek
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LanguageSwitcher;

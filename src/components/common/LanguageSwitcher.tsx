import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

const LanguageSwitcher: React.FC = () => {
    const { i18n } = useTranslation();
    const [isOpen, setIsOpen] = React.useState(false);
    const dropdownRef = React.useRef<HTMLDivElement>(null);

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
        setIsOpen(false);
    };

    // Close dropdown when clicking outside
    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
            >
                <Globe className="w-4 h-4" />
                <span>{i18n.language === 'uz' ? 'O\'zbek' : 'English'}</span>
            </button>
            <div className={`absolute right-0 pt-2 w-full transition-all duration-200 z-[1000] ${isOpen ? 'opacity-100 visible transform translate-y-0' : 'opacity-0 invisible transform -translate-y-2'
                }`}>
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden p-1">
                    <div className="flex flex-col gap-1">
                        <button
                            onClick={() => changeLanguage('en')}
                            className={`block w-full text-left px-4 py-2 text-sm rounded-xl transition-colors ${i18n.language === 'en'
                                ? 'bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white'
                                : 'text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700'
                                }`}
                        >
                            English
                        </button>
                        <button
                            onClick={() => changeLanguage('uz')}
                            className={`block w-full text-left px-4 py-2 text-sm rounded-xl transition-colors ${i18n.language === 'uz'
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

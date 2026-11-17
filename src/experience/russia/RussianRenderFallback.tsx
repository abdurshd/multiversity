import { useTranslation } from 'react-i18next';
import { RUSSIA_TEXT } from './text';

export function RussianRenderFallback() {
    const { i18n } = useTranslation();
    const t = RUSSIA_TEXT[(i18n.resolvedLanguage?.split('-')[0] || 'en') as keyof typeof RUSSIA_TEXT] ?? RUSSIA_TEXT.en;
    return <div className="russia-render-fallback"><p role="status">{t.fallback}</p></div>;
}

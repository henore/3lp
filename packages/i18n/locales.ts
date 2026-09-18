export const locales = {ja:'日本語',en:'English','zh-CN':'简体中文','zh-TW':'繁體中文',ko:'한국어',de:'Deutsch',fr:'Français',es:'Español',it:'Italiano','pt-BR':'Português',nl:'Nederlands',sv:'Svenska',pl:'Polski',ru:'Русский',ar:'العربية',hi:'हिन्दी',th:'ไทย',vi:'Tiếng Việt',id:'Bahasa Indonesia'} as const;
export type Locale = keyof typeof locales;
export const localeCodes = Object.keys(locales) as Locale[];
export const direction = (locale: Locale) => locale === 'ar' ? 'rtl' : 'ltr';


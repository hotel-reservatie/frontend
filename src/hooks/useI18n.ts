import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next, useTranslation } from 'react-i18next'

import translationsEN from '../translations/locales/en/translations.json'
import translationsNL from '../translations/locales/nl/translations.json'

export default () => {
  i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .use(LanguageDetector)
    .init({
      resources: {
        en: {
          translation: translationsEN,
        },
        nl: {
          translation: translationsNL,
        },
      },
      fallbackLng: 'en',
      interpolation: {
        escapeValue: false, // react already safes from xss
      },
      detection: {
        order: [
          'querystring',
          'cookie',
          'localStorage',
          'sessionStorage',
          'navigator',
          'htmlTag',
          'path',
          'subdomain',
        ],

        // keys or params to lookup language from
        lookupQuerystring: 'lng',
        lookupCookie: 'i18next',
        lookupLocalStorage: 'i18nextLng',
        lookupSessionStorage: 'i18nextLng',
        lookupFromPathIndex: 0,
        lookupFromSubdomainIndex: 0,
      },
    })

  const { t, i18n: translations } = useTranslation()
  return {
    t,
    i18n: translations,
  }
}

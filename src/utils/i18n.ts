import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

import translationsEN from '../locales/Hotelreservation_English.json'
import translationsNL from '../locales/Hotelreservation_Dutch.json'

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
    returnObjects: true,
  })

const t = (s: string) => {
  const translatedString = i18n.t(s)

  // catch if translatedstring returns an object (happens when using contexts)
  if (typeof translatedString === 'object') {
    console.log(s, translatedString)

    const translatedValue = translatedString[Object.keys(translatedString)[0]]
    return translatedValue
  }

  return translatedString
}

export default t

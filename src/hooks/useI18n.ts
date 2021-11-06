import i18n from 'i18next'
import { useRouter } from 'next/router'
import { initReactI18next, useTranslation } from 'react-i18next'

import translationsEN from '../translations/locales/en/translations.json'
import translationsNL from '../translations/locales/nl/translations.json'

export default () => {
  const router = useRouter()

  i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
      resources: {
        en: {
          translation: translationsEN,
        },
        nl: {
          translation: translationsNL,
        },
      },
      lng: router.locale,
      fallbackLng: 'en',
      interpolation: {
        escapeValue: false, // react already safes from xss
      },
    })

  const { t, i18n: translations } = useTranslation()
  return {
    t,
    i18n: translations,
  }
}

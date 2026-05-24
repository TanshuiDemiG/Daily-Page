import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import enCommon from './en/common'
import zhCommon from './zh/common'

function getInitialLanguage() {
  if (typeof window === 'undefined') {
    return 'zh'
  }

  return window.localStorage.getItem('terraflux-language') === 'en' ? 'en' : 'zh'
}

const resources = {
  zh: { common: zhCommon },
  en: { common: enCommon },
} as const

void i18n.use(initReactI18next).init({
  resources,
  lng: getInitialLanguage(),
  fallbackLng: 'en',
  defaultNS: 'common',
  interpolation: {
    escapeValue: false,
  },
})

export default i18n

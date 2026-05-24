import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import enCommon from './en/common'
import zhCommon from './zh/common'

const resources = {
  zh: { common: zhCommon },
  en: { common: enCommon },
} as const

void i18n.use(initReactI18next).init({
  resources,
  lng: 'zh',
  fallbackLng: 'en',
  defaultNS: 'common',
  interpolation: {
    escapeValue: false,
  },
})

export default i18n

import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useSiteStore } from '../../store/useSiteStore'

const languages: Array<{ value: 'zh' | 'en'; labelKey: 'zh' | 'en' }> = [
  { value: 'zh', labelKey: 'zh' },
  { value: 'en', labelKey: 'en' },
]

function LanguageSwitcher() {
  const { t, i18n } = useTranslation()
  const { language, setLanguage } = useSiteStore()

  const handleChange = (value: 'zh' | 'en') => {
    setLanguage(value)
    void i18n.changeLanguage(value)
  }

  return (
    <div className="pointer-events-auto fixed right-5 top-5 z-30 md:right-8 md:top-8">
      <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 p-1.5 shadow-glow backdrop-blur-md">
        {languages.map(({ value, labelKey }) => {
          const active = language === value

          return (
            <button
              key={value}
              type="button"
              onClick={() => handleChange(value)}
              className="relative rounded-full px-3 py-1.5 text-xs text-white/70 transition hover:text-white"
              aria-pressed={active}
            >
              {active ? (
                <motion.span
                  layoutId="language-pill"
                  className="absolute inset-0 rounded-full border border-glow/30 bg-glow/10"
                  transition={{ type: 'spring', stiffness: 260, damping: 24 }}
                />
              ) : null}
              <span className="relative z-10">{t(`language.${labelKey}`)}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default LanguageSwitcher

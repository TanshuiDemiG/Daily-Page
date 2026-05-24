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
    <div className="pointer-events-auto">
      <div className="glass-panel flex items-center gap-2 rounded-full p-1.5">
        {languages.map(({ value, labelKey }) => {
          const active = language === value

          return (
            <button
              key={value}
              type="button"
              onClick={() => handleChange(value)}
              className="relative rounded-full px-3 py-1.5 text-xs tracking-[0.24em] text-white/64 transition hover:text-white"
              aria-pressed={active}
              aria-label={t(`language.${labelKey}`)}
            >
              {active ? (
                <motion.span
                  layoutId="language-pill"
                  className="absolute inset-0 rounded-full border border-gold/20 bg-white/[0.06]"
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

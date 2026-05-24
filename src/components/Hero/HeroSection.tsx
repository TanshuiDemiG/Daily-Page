import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

function HeroSection() {
  const { t } = useTranslation()

  return (
    <motion.header
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.1, ease: 'easeOut' }}
      className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center"
    >
      <div className="space-y-4">
        <p className="text-[11px] uppercase tracking-[0.45em] text-white/40">
          {t('site.tagline')}
        </p>
        <h1 className="font-display text-5xl font-semibold tracking-[0.08em] text-white md:text-7xl">
          {t('site.title')}
        </h1>
        <p className="mx-auto max-w-2xl text-sm leading-7 text-mist/80 md:text-base">
          {t('site.subtitle')}
        </p>
      </div>
      <p className="max-w-xl text-sm leading-7 text-white/45 md:text-base">
        {t('site.body')}
      </p>
    </motion.header>
  )
}

export default HeroSection

import { AnimatePresence, motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useRotatingMessages } from '../../hooks/useRotatingMessages'

const progressValue = 42

function GrowthProgress() {
  const { t } = useTranslation()
  const messages = t('progress.messages', { returnObjects: true }) as string[]
  const currentIndex = useRotatingMessages(messages.length)

  return (
    <section className="mx-auto mt-10 w-full max-w-xl rounded-[28px] border border-white/10 bg-white/[0.04] px-5 py-5 shadow-glow backdrop-blur-xl md:px-7">
      <div className="mb-4 flex items-center justify-between text-xs uppercase tracking-[0.35em] text-white/45">
        <span>{t('progress.label')}</span>
        <span>{progressValue}%</span>
      </div>

      <div className="relative h-3 overflow-hidden rounded-full bg-white/10">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progressValue}%` }}
          transition={{ duration: 1.6, ease: 'easeOut' }}
          className="relative h-full rounded-full bg-gradient-to-r from-glow/40 via-glow to-gold/70"
        >
          <div className="absolute inset-y-0 w-1/3 animate-shimmer bg-gradient-to-r from-transparent via-white/35 to-transparent" />
        </motion.div>
      </div>

      <div className="mt-3 flex items-center justify-between text-xs text-white/45">
        <span>{t('progress.percentLabel')}</span>
        <span className="tracking-[0.35em] text-gold/80">v0.1</span>
      </div>

      <div className="relative mt-6 min-h-7 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.p
            key={messages[currentIndex]}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.55 }}
            className="absolute inset-0 text-sm tracking-[0.18em] text-mist/80"
          >
            {messages[currentIndex]}
          </motion.p>
        </AnimatePresence>
      </div>
    </section>
  )
}

export default GrowthProgress

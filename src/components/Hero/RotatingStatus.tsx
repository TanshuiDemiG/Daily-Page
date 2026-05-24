import { AnimatePresence, motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useRotatingMessages } from '../../hooks/useRotatingMessages'

function RotatingStatus() {
  const { t } = useTranslation()
  const messages = t('status.messages', { returnObjects: true }) as string[]
  const currentIndex = useRotatingMessages(messages.length)

  return (
    <section className="mx-auto flex max-w-xl flex-col items-center text-center">
      <p className="mb-4 text-[11px] uppercase tracking-[0.42em] text-white/34">{t('status.label')}</p>
      <div className="relative min-h-8">
        <AnimatePresence mode="wait">
          <motion.p
            key={messages[currentIndex]}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-base tracking-[0.18em] text-mist/84 md:text-lg"
          >
            {messages[currentIndex]}
          </motion.p>
        </AnimatePresence>
      </div>
    </section>
  )
}

export default RotatingStatus

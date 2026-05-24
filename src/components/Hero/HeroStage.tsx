import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useSiteStore } from '../../store/useSiteStore'
import GrowthProgress from './GrowthProgress'
import RotatingStatus from './RotatingStatus'

function HeroStage() {
  const { t } = useTranslation()
  const progressValue = useSiteStore((state) => state.progressValue)
  const marks = t('hero.marks', { returnObjects: true }) as string[]

  return (
    <section className="relative z-10 flex min-h-screen items-center justify-center px-6 pb-24 pt-32 md:px-10 md:pb-28 md:pt-36">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="space-y-6"
        >
          <p className="text-[11px] uppercase tracking-[0.45em] text-white/38 md:text-xs">
            {t('brand.kicker')}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 text-[10px] uppercase tracking-[0.4em] text-white/32 md:gap-4">
            {marks.map((mark) => (
              <span key={mark} className="rounded-full border border-white/10 px-3 py-1">
                {mark}
              </span>
            ))}
          </div>

          <div className="space-y-2">
            <motion.h1
              initial={{ opacity: 0, letterSpacing: '0.42em' }}
              animate={{ opacity: 1, letterSpacing: '0.18em' }}
              transition={{ duration: 1.8, ease: 'easeOut', delay: 0.15 }}
              className="font-display text-[clamp(4.8rem,16vw,9rem)] leading-none text-mist"
            >
              山海行
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.4 }}
              className="animate-breathe text-[12px] uppercase tracking-[0.85em] text-white/44 md:text-[13px]"
            >
              TERRAFLUX
            </motion.p>
          </div>

          <div className="mx-auto max-w-3xl space-y-4">
            <p className="text-balance text-lg leading-8 text-mist/88 md:text-2xl md:leading-10">
              {t('hero.subtitle')}
            </p>
            <p className="mx-auto max-w-2xl text-sm leading-7 text-white/50 md:text-base">
              {t('hero.body')}
            </p>
          </div>
        </motion.div>

        <GrowthProgress progress={progressValue} />
        <RotatingStatus />

        <p className="text-[11px] uppercase tracking-[0.42em] text-white/28 md:text-xs">
          {t('hero.note')}
        </p>
      </div>
    </section>
  )
}

export default HeroStage

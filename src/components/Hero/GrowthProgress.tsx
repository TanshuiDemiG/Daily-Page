import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

type GrowthProgressProps = {
  progress: number
}

function GrowthProgress({ progress }: GrowthProgressProps) {
  const { t } = useTranslation()
  const totalSegments = 14
  const activeSegments = Math.max(1, Math.round((progress / 100) * totalSegments))
  const barGlyphs = `${'█'.repeat(activeSegments)}${'░'.repeat(totalSegments - activeSegments)}`

  return (
    <section className="glass-panel metal-sheen mx-auto w-full max-w-2xl rounded-[30px] px-5 py-5 md:px-7 md:py-6">
      <div className="mb-4 flex items-center justify-between gap-4 text-xs uppercase tracking-[0.34em] text-white/44">
        <span>{t('progress.label')}</span>
        <span>{progress}%</span>
      </div>

      <div className="relative overflow-hidden rounded-full border border-white/8 bg-white/[0.03] p-1.5">
        <div
          className="grid gap-1"
          style={{ gridTemplateColumns: `repeat(${totalSegments}, minmax(0, 1fr))` }}
        >
          {Array.from({ length: totalSegments }, (_, index) => (
            <span
              key={index}
              className={`h-4 rounded-full transition ${
                index < activeSegments
                  ? 'bg-gradient-to-r from-river/60 via-mist/80 to-gold/65 shadow-glow'
                  : 'bg-white/6'
              }`}
            />
          ))}
        </div>

        <motion.div
          className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-transparent via-white/15 to-transparent"
          animate={{ x: ['-120%', '420%'] }}
          transition={{ duration: 5.8, repeat: Number.POSITIVE_INFINITY, ease: 'linear' }}
        />
      </div>

      <div className="mt-4 flex flex-col gap-2 text-sm md:flex-row md:items-center md:justify-between">
        <p className="font-mono tracking-[0.18em] text-mist/88">
          [{barGlyphs}] {progress}%
        </p>
        <p className="text-white/52">{t('progress.descriptor')}</p>
      </div>

      <div className="mt-3 flex items-center justify-between text-[11px] uppercase tracking-[0.34em] text-white/28">
        <span>{t('progress.barLabel')}</span>
        <span>{t('progress.version')}</span>
      </div>
    </section>
  )
}

export default GrowthProgress

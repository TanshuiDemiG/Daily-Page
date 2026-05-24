import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { GanzhiKey, getGanzhiSnapshot } from '../../utils/ganzhi'

function TimeBackground() {
  const { t, i18n } = useTranslation()
  const labels = useMemo(
    () =>
      ({
        year: t('time.year'),
        month: t('time.month'),
        day: t('time.day'),
        hour: t('time.hour'),
      }) satisfies Record<GanzhiKey, string>,
    [t],
  )

  const [snapshot, setSnapshot] = useState(() =>
    getGanzhiSnapshot(new Date(), labels, i18n.language === 'en' ? 'en-US' : 'zh-CN'),
  )

  useEffect(() => {
    const updateSnapshot = () => {
      setSnapshot(
        getGanzhiSnapshot(new Date(), labels, i18n.language === 'en' ? 'en-US' : 'zh-CN'),
      )
    }

    updateSnapshot()
    const timer = window.setInterval(updateSnapshot, 60_000)

    return () => window.clearInterval(timer)
  }, [i18n.language, labels])

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute left-1/2 top-1/2 h-[min(76vw,34rem)] w-[min(76vw,34rem)] -translate-x-1/2 -translate-y-1/2 md:left-[72%]"
        animate={{ y: [0, -14, 0], rotate: [0, 2, 0] }}
        transition={{ duration: 22, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
      >
        <div className="absolute inset-0 rounded-full border border-glow/10 bg-[radial-gradient(circle,_rgba(111,207,255,0.08),_transparent_56%)]" />
        <div className="absolute inset-[10%] rounded-full border border-white/5" />

        {snapshot.pillars.map((pillar, index) => (
          <motion.div
            key={pillar.key}
            className="absolute left-1/2 top-1/2 rounded-full border border-white/10"
            style={{
              width: `${pillar.size}%`,
              height: `${pillar.size}%`,
              opacity: pillar.opacity,
              translateX: '-50%',
              translateY: '-50%',
            }}
            animate={{ rotate: index % 2 === 0 ? 360 : -360 }}
            transition={{
              duration: 110 + index * 18,
              repeat: Number.POSITIVE_INFINITY,
              ease: 'linear',
            }}
          >
            <div
              className="absolute left-1/2 top-1/2 h-full w-full"
              style={{
                transform: `translate(-50%, -50%) rotate(${pillar.angle}deg)`,
              }}
            >
              <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full border border-glow/20 bg-ink/70 px-3 py-2 text-center shadow-glow backdrop-blur-sm">
                <p className="text-[10px] uppercase tracking-[0.32em] text-white/35">
                  {pillar.label}
                </p>
                <p className="mt-1 font-display text-lg tracking-[0.2em] text-mist">
                  {pillar.value}
                </p>
              </div>
            </div>
          </motion.div>
        ))}

        <div className="absolute left-1/2 top-1/2 flex w-[42%] -translate-x-1/2 -translate-y-1/2 flex-col items-center rounded-full border border-white/10 bg-ink/60 px-4 py-8 text-center shadow-glow backdrop-blur-md">
          <p className="text-[10px] uppercase tracking-[0.42em] text-white/35">
            {t('time.wheelTitle')}
          </p>
          <p className="mt-3 font-display text-3xl tracking-[0.16em] text-white/80 md:text-4xl">
            {snapshot.pillars.map((pillar) => pillar.value).join(' ')}
          </p>
          <p className="mt-3 text-[11px] tracking-[0.24em] text-white/45">
            {t('time.wheelSubtitle')}
          </p>
          <time
            dateTime={snapshot.isoString}
            className="mt-2 text-[11px] tracking-[0.18em] text-gold/70"
          >
            {snapshot.displayTime}
          </time>
        </div>
      </motion.div>
    </div>
  )
}

export default TimeBackground

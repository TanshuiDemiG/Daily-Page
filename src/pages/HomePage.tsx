import { useTranslation } from 'react-i18next'
import HeroStage from '../components/hero/HeroStage'
import FooterMeta from '../components/layout/FooterMeta'
import TopBar from '../components/layout/TopBar'
import TimeCanvasBackground from '../components/three/TimeCanvasBackground'

function HomePage() {
  const { t } = useTranslation()

  return (
    <main className="relative min-h-screen overflow-hidden bg-ink text-mist">
      <TimeCanvasBackground />

      <div className="absolute inset-x-0 top-[27%] z-10 hidden justify-between px-10 xl:flex">
        <div className="ambient-line max-w-[220px] text-left">
          <p className="text-[10px] uppercase tracking-[0.42em] text-white/24">{t('ambient.left')}</p>
        </div>
        <div className="ambient-line max-w-[240px] text-right">
          <p className="text-[10px] uppercase tracking-[0.42em] text-white/24">{t('ambient.right')}</p>
        </div>
      </div>

      <div className="relative flex min-h-screen flex-col">
        <TopBar />
        <HeroStage />
        <FooterMeta />
      </div>
    </main>
  )
}

export default HomePage

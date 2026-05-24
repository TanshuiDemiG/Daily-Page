import FooterBar from '../components/Footer/FooterBar'
import HeroSection from '../components/Hero/HeroSection'
import LanguageSwitcher from '../components/LanguageSwitcher/LanguageSwitcher'
import GrowthProgress from '../components/ProgressBar/GrowthProgress'
import ThreeScene from '../components/ThreeScene/ThreeScene'
import TimeBackground from '../components/TimeBackground/TimeBackground'

function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-ink text-white">
      <ThreeScene />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(90,175,255,0.14),_transparent_34%),radial-gradient(circle_at_bottom,_rgba(143,122,66,0.08),_transparent_26%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,5,8,0.2),rgba(3,5,8,0.75)_72%,rgba(3,5,8,0.96))]" />
      <TimeBackground />
      <LanguageSwitcher />

      <section className="relative z-10 flex min-h-screen items-center justify-center px-5 py-20 md:px-8">
        <div className="w-full max-w-6xl">
          <div className="mx-auto flex min-h-[72vh] max-w-4xl flex-col justify-center gap-12">
            <HeroSection />
            <GrowthProgress />
            <FooterBar />
          </div>
        </div>
      </section>
    </main>
  )
}

export default HomePage

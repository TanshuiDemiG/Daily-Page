import { useTranslation } from 'react-i18next'
import TerrafluxLogo from '../branding/TerrafluxLogo'
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher'

function TopBar() {
  const { t } = useTranslation()

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-30 px-4 pt-4 md:px-8 md:pt-7">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        <div className="pointer-events-auto glass-panel flex items-center gap-4 rounded-full px-3 py-2 md:px-4">
          <TerrafluxLogo className="h-12 w-12 text-mist md:h-14 md:w-14" />
          <div className="min-w-0">
            <p className="font-display text-lg tracking-[0.22em] text-mist md:text-xl">
              TERRAFLUX
            </p>
            <p className="text-[10px] uppercase tracking-[0.42em] text-white/42 md:text-[11px]">
              {t('topbar.note')}
            </p>
          </div>
        </div>

        <LanguageSwitcher />
      </div>
    </header>
  )
}

export default TopBar

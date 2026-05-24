import { Github, Mail } from 'lucide-react'
import { useTranslation } from 'react-i18next'

function FooterBar() {
  const { t } = useTranslation()

  return (
    <footer className="flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/40 md:flex-row">
      <div className="flex items-center gap-6">
        <a
          href="#github"
          className="inline-flex items-center gap-2 transition hover:text-mist"
        >
          <Github className="h-4 w-4" />
          <span>{t('footer.github')}</span>
        </a>
        <a
          href="#email"
          className="inline-flex items-center gap-2 transition hover:text-mist"
        >
          <Mail className="h-4 w-4" />
          <span>{t('footer.email')}</span>
        </a>
      </div>
      <p className="tracking-[0.25em] text-white/35">{t('footer.builtWith')}</p>
    </footer>
  )
}

export default FooterBar

import { Github, Mail } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { siteConfig } from '../../config/site'

function FooterMeta() {
  const { t } = useTranslation()

  return (
    <footer className="relative z-10 px-6 pb-6 md:px-10 md:pb-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 border-t border-white/10 pt-5 text-xs text-white/40 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap items-center gap-6">
          <a
            href={siteConfig.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 transition hover:text-mist"
          >
            <Github className="h-4 w-4" />
            <span>{t('footer.github')}</span>
          </a>

          <a href={siteConfig.emailHref} className="inline-flex items-center gap-2 transition hover:text-mist">
            <Mail className="h-4 w-4" />
            <span>{t('footer.email')}</span>
          </a>
        </div>

        <div className="space-y-1 text-right">
          <p className="tracking-[0.3em] text-white/35">{t('footer.builtWith')}</p>
          <p className="text-[10px] uppercase tracking-[0.42em] text-white/25">{t('footer.note')}</p>
        </div>
      </div>
    </footer>
  )
}

export default FooterMeta

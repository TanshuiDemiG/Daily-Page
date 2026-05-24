import { create } from 'zustand'
import { siteConfig } from '../config/site'

type Language = 'zh' | 'en'
export type SceneQuality = 'high' | 'medium' | 'low'

type SiteState = {
  language: Language
  progressValue: number
  sceneQuality: SceneQuality
  setLanguage: (language: Language) => void
  setSceneQuality: (sceneQuality: SceneQuality) => void
}

function getInitialLanguage(): Language {
  if (typeof window === 'undefined') {
    return 'zh'
  }

  return window.localStorage.getItem('terraflux-language') === 'en' ? 'en' : 'zh'
}

export const useSiteStore = create<SiteState>((set) => ({
  language: getInitialLanguage(),
  progressValue: siteConfig.progressValue,
  sceneQuality: 'high',
  setLanguage: (language) => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('terraflux-language', language)
    }

    set({ language })
  },
  setSceneQuality: (sceneQuality) => set({ sceneQuality }),
}))

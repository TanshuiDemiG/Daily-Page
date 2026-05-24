import { create } from 'zustand'

type Language = 'zh' | 'en'

type SiteState = {
  language: Language
  setLanguage: (language: Language) => void
}

export const useSiteStore = create<SiteState>((set) => ({
  language: 'zh',
  setLanguage: (language) => set({ language }),
}))

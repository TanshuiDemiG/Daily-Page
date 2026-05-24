import { useEffect, useState } from 'react'
import { SceneQuality, useSiteStore } from '../store/useSiteStore'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

function resolveSceneQuality(width: number, prefersReducedMotion: boolean): SceneQuality {
  if (prefersReducedMotion || width < 768) {
    return 'low'
  }

  if (width < 1280) {
    return 'medium'
  }

  return 'high'
}

export function useSceneQuality() {
  const prefersReducedMotion = usePrefersReducedMotion()
  const setSceneQuality = useSiteStore((state) => state.setSceneQuality)
  const [sceneQuality, setSceneQualityState] = useState<SceneQuality>(() => {
    if (typeof window === 'undefined') {
      return 'high'
    }

    return resolveSceneQuality(window.innerWidth, false)
  })

  useEffect(() => {
    const updateSceneQuality = () => {
      const nextQuality = resolveSceneQuality(window.innerWidth, prefersReducedMotion)
      setSceneQualityState(nextQuality)
      setSceneQuality(nextQuality)
    }

    updateSceneQuality()
    window.addEventListener('resize', updateSceneQuality)

    return () => window.removeEventListener('resize', updateSceneQuality)
  }, [prefersReducedMotion, setSceneQuality])

  return sceneQuality
}

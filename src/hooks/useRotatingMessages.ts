import { useEffect, useState } from 'react'

export function useRotatingMessages(length: number, interval = 5200) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (length <= 1) {
      return undefined
    }

    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % length)
    }, interval)

    return () => window.clearInterval(timer)
  }, [interval, length])

  return index
}

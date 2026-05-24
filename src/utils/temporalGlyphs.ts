const heavenlyStems = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'] as const
const earthlyBranches = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'] as const
const timeUnits = ['年', '月', '日', '时'] as const

export type TemporalGlyph = {
  id: string
  primary: string
  secondary: string
  x: number
  y: number
  scale: number
  blur: number
  opacity: number
  drift: number
  duration: number
  delay: number
  rotate: number
}

type RandomSource = () => number

function pick<T>(collection: readonly T[], random: RandomSource) {
  return collection[Math.floor(random() * collection.length)]
}

export function createTemporalGlyphs(count: number, random: RandomSource = Math.random) {
  return Array.from({ length: count }, (_, index): TemporalGlyph => {
    const stem = pick(heavenlyStems, random)
    const branch = pick(earthlyBranches, random)
    const unit = pick(timeUnits, random)

    return {
      id: `${index}-${stem}${branch}-${unit}`,
      primary: `${stem}${branch}`,
      secondary: unit,
      x: 8 + random() * 84,
      y: 12 + random() * 72,
      scale: 0.75 + random() * 1.15,
      blur: random() * 1.4,
      opacity: 0.08 + random() * 0.12,
      drift: 10 + random() * 22,
      duration: 18 + random() * 16,
      delay: random() * 6,
      rotate: -8 + random() * 16,
    }
  })
}

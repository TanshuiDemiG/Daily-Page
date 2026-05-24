import { describe, expect, it } from 'vitest'
import { getGanzhiSnapshot } from './ganzhi'

const labels = {
  year: '年',
  month: '月',
  day: '日',
  hour: '时',
} as const

describe('getGanzhiSnapshot', () => {
  it('keeps the previous pillars before lichun in 1984', () => {
    const snapshot = getGanzhiSnapshot(new Date(1984, 1, 4, 11, 0), labels)
    const pillars = Object.fromEntries(snapshot.pillars.map((pillar) => [pillar.key, pillar.value]))

    expect(pillars.year).toBe('癸亥')
    expect(pillars.month).toBe('乙丑')
  })

  it('switches to the new pillars after lichun in 1984', () => {
    const snapshot = getGanzhiSnapshot(new Date(1984, 1, 5, 11, 0), labels)
    const pillars = Object.fromEntries(snapshot.pillars.map((pillar) => [pillar.key, pillar.value]))

    expect(pillars.year).toBe('甲子')
    expect(pillars.month).toBe('丙寅')
  })

  it('uses the anchored day and hour formulas correctly', () => {
    const snapshot = getGanzhiSnapshot(new Date(1900, 0, 31, 23, 0), labels)
    const pillars = Object.fromEntries(snapshot.pillars.map((pillar) => [pillar.key, pillar.value]))

    expect(pillars.day).toBe('甲辰')
    expect(pillars.hour).toBe('甲子')
  })

  it('formats the four pillars with ring metadata', () => {
    const snapshot = getGanzhiSnapshot(new Date(2026, 4, 24, 10, 15), labels, 'zh-CN')

    expect(snapshot.pillars).toHaveLength(4)
    expect(snapshot.pillars[0]).toMatchObject({
      key: 'year',
      label: '年',
      size: 87,
    })
    expect(snapshot.displayTime).toContain('2026')
  })
})

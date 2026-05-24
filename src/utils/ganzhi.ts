const heavenlyStems = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'] as const
const earthlyBranches = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'] as const
const solarTermInfo = [
  0, 21208, 42467, 63836, 85337, 107014, 128867, 150921, 173149, 195551, 218072,
  240693, 263343, 285989, 308563, 331033, 353350, 375494, 397447, 419210, 440795,
  462224, 483532, 504758,
] as const

const solarTermCache = new Map<number, Date[]>()

const orbitAngles: Record<GanzhiKey, number> = {
  year: -80,
  month: 28,
  day: 136,
  hour: 224,
}

const ringSizes: Record<GanzhiKey, number> = {
  year: 87,
  month: 70,
  day: 53,
  hour: 36,
}

const ringOpacity: Record<GanzhiKey, number> = {
  year: 0.26,
  month: 0.21,
  day: 0.17,
  hour: 0.14,
}

export type GanzhiKey = 'year' | 'month' | 'day' | 'hour'

export type GanzhiPillar = {
  key: GanzhiKey
  label: string
  value: string
  stem: string
  branch: string
  angle: number
  size: number
  opacity: number
}

export type GanzhiSnapshot = {
  pillars: GanzhiPillar[]
  isoString: string
  displayTime: string
}

function mod(value: number, divisor: number) {
  return ((value % divisor) + divisor) % divisor
}

function toGanzhi(stemIndex: number, branchIndex: number) {
  return `${heavenlyStems[stemIndex]}${earthlyBranches[branchIndex]}`
}

function getSolarTerms(year: number) {
  const cachedTerms = solarTermCache.get(year)

  if (cachedTerms) {
    return cachedTerms
  }

  const baseUtcTime = Date.UTC(1900, 0, 6, 2, 5)
  const tropicalYearMilliseconds = 31556925974.7

  const terms = solarTermInfo.map(
    (minutes) => new Date(baseUtcTime + tropicalYearMilliseconds * (year - 1900) + minutes * 60_000),
  )

  solarTermCache.set(year, terms)
  return terms
}

function getLichunTime(year: number) {
  return getSolarTerms(year)[2]
}

function getYearForGanzhi(date: Date) {
  const year = date.getFullYear()
  const isAfterLichun = date.getTime() >= getLichunTime(year).getTime()

  return isAfterLichun ? year : year - 1
}

function getSolarTermContext(date: Date) {
  const year = date.getFullYear()
  const currentTime = date.getTime()
  const currentYearTerms = getSolarTerms(year)
  const previousYearTerms = getSolarTerms(year - 1)
  const monthBoundaries = [
    { solarTermYear: year, solarTermMonth: 11, time: currentYearTerms[22] },
    { solarTermYear: year, solarTermMonth: 10, time: currentYearTerms[20] },
    { solarTermYear: year, solarTermMonth: 9, time: currentYearTerms[18] },
    { solarTermYear: year, solarTermMonth: 8, time: currentYearTerms[16] },
    { solarTermYear: year, solarTermMonth: 7, time: currentYearTerms[14] },
    { solarTermYear: year, solarTermMonth: 6, time: currentYearTerms[12] },
    { solarTermYear: year, solarTermMonth: 5, time: currentYearTerms[10] },
    { solarTermYear: year, solarTermMonth: 4, time: currentYearTerms[8] },
    { solarTermYear: year, solarTermMonth: 3, time: currentYearTerms[6] },
    { solarTermYear: year, solarTermMonth: 2, time: currentYearTerms[4] },
    { solarTermYear: year, solarTermMonth: 1, time: currentYearTerms[2] },
    { solarTermYear: year - 1, solarTermMonth: 12, time: currentYearTerms[0] },
    { solarTermYear: year - 1, solarTermMonth: 11, time: previousYearTerms[22] },
  ]

  const matchedBoundary = monthBoundaries.find(
    (boundary) => currentTime >= boundary.time.getTime(),
  )

  if (matchedBoundary) {
    return {
      solarTermYear: matchedBoundary.solarTermYear,
      solarTermMonth: matchedBoundary.solarTermMonth,
    }
  }

  return { solarTermYear: year - 1, solarTermMonth: 11 }
}

function getDayOffset(date: Date) {
  const anchor = new Date(1900, 0, 31)
  const current = new Date(date.getFullYear(), date.getMonth(), date.getDate())
  const millisecondsPerDay = 24 * 60 * 60 * 1000

  return Math.floor((current.getTime() - anchor.getTime()) / millisecondsPerDay)
}

function getYearPillar(date: Date) {
  const year = getYearForGanzhi(date)
  const stemIndex = mod(year - 4, 10)
  const branchIndex = mod(year - 4, 12)

  return {
    stemIndex,
    branchIndex,
    value: toGanzhi(stemIndex, branchIndex),
  }
}

function getMonthPillar(date: Date) {
  const { solarTermYear, solarTermMonth } = getSolarTermContext(date)
  const stemIndex = mod(solarTermYear * 12 + solarTermMonth + 3, 10)
  const branchIndex = mod(solarTermMonth + 1, 12)

  return {
    stemIndex,
    branchIndex,
    value: toGanzhi(stemIndex, branchIndex),
  }
}

function getDayPillar(date: Date) {
  const offset = getDayOffset(date)
  const stemIndex = mod(offset, 10)
  const branchIndex = mod(offset + 4, 12)

  return {
    stemIndex,
    branchIndex,
    value: toGanzhi(stemIndex, branchIndex),
  }
}

function getHourPillar(date: Date, dayStemIndex: number) {
  const hour = date.getHours()
  const branchIndex = mod(Math.floor((hour + 1) / 2), 12)
  const stemIndex = mod((dayStemIndex % 5) * 2 + branchIndex, 10)

  return {
    stemIndex,
    branchIndex,
    value: toGanzhi(stemIndex, branchIndex),
  }
}

function formatDisplayTime(date: Date, locale: string) {
  return date.toLocaleString(locale, {
    hour12: false,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function getGanzhiSnapshot(
  date: Date,
  labels: Record<GanzhiKey, string>,
  locale = 'zh-CN',
): GanzhiSnapshot {
  const year = getYearPillar(date)
  const month = getMonthPillar(date)
  const day = getDayPillar(date)
  const hour = getHourPillar(date, day.stemIndex)

  const pillars: GanzhiPillar[] = [
    { key: 'year', ...year },
    { key: 'month', ...month },
    { key: 'day', ...day },
    { key: 'hour', ...hour },
  ].map((pillar) => ({
    key: pillar.key,
    label: labels[pillar.key],
    value: pillar.value,
    stem: heavenlyStems[pillar.stemIndex],
    branch: earthlyBranches[pillar.branchIndex],
    angle: orbitAngles[pillar.key],
    size: ringSizes[pillar.key],
    opacity: ringOpacity[pillar.key],
  }))

  return {
    pillars,
    isoString: date.toISOString(),
    displayTime: formatDisplayTime(date, locale),
  }
}

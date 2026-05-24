import { describe, expect, it } from 'vitest'
import { createTemporalGlyphs } from './temporalGlyphs'

describe('createTemporalGlyphs', () => {
  it('creates the requested number of glyphs', () => {
    const glyphs = createTemporalGlyphs(6, () => 0.25)

    expect(glyphs).toHaveLength(6)
    expect(glyphs[0].primary).toBe('丙卯')
    expect(glyphs[0].secondary).toBe('月')
  })

  it('keeps generated positions and motion tokens within visual bounds', () => {
    const glyphs = createTemporalGlyphs(12, () => 0.8)

    expect(glyphs.every((glyph) => glyph.x >= 8 && glyph.x <= 92)).toBe(true)
    expect(glyphs.every((glyph) => glyph.y >= 12 && glyph.y <= 84)).toBe(true)
    expect(glyphs.every((glyph) => glyph.opacity >= 0.08 && glyph.opacity <= 0.2)).toBe(true)
    expect(glyphs.every((glyph) => glyph.duration >= 18 && glyph.duration <= 34)).toBe(true)
  })
})

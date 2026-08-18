import { dashCaseToWords } from './dashCaseToWords'

describe('dashCaseToWords', () => {
  it('should convert a dash-case slug into capitalized words', () => {
    expect(dashCaseToWords('aurora-lounge-chair')).toBe('Aurora Lounge Chair')
  })

  it('should capitalize a single word', () => {
    expect(dashCaseToWords('lamp')).toBe('Lamp')
  })

  it('should return an empty string for an empty input', () => {
    expect(dashCaseToWords('')).toBe('')
  })

  it('should collapse consecutive dashes without producing empty words', () => {
    expect(dashCaseToWords('a--b')).toBe('A B')
  })
})

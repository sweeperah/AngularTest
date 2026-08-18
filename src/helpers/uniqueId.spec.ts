import { uniqueId } from './uniqueId'

describe('uniqueId', () => {
  it('should prefix the generated id with the given prefix', () => {
    expect(uniqueId('input')).toMatch(/^input-\d+$/)
  })

  it('should return a different id on each call', () => {
    const first = uniqueId('input')
    const second = uniqueId('input')

    expect(first).not.toBe(second)
  })
})

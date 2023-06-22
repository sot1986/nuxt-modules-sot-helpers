import { describe, expect, it } from 'vitest'
import uniqueId from '../src/runtime/Utils/uniqueId'

describe('test uniqueId function', () => {
  it('test 1000 values are all different', () => {
    const uniqueSet = new Set<string>()

    for (let index = 0; index < 1000; index++)
      uniqueSet.add(uniqueId())

    expect(uniqueSet.size).toBe(1000)
  })
})

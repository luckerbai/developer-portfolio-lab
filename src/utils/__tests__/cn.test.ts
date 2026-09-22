import { describe, it, expect } from 'vitest'
import { cn } from '../cn'

describe('cn', () => {
  it('merges class names', () => {
    expect(cn('foo', 'bar')).toBe('foo bar')
  })

  it('handles conditional classes', () => {
    expect(cn('base', { active: true, disabled: false })).toBe('base active')
  })

  it('deduplicates tailwind classes', () => {
    expect(cn('px-4', 'px-6')).toBe('px-6')
  })

  it('handles undefined and null', () => {
    expect(cn('foo', undefined, null, false)).toBe('foo')
  })
})

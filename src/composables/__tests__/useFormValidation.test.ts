import { describe, it, expect } from 'vitest'
import { z } from 'zod'
import { useFormValidation } from '../useFormValidation'

const testSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password too short'),
})

describe('useFormValidation', () => {
  it('should return initial state', () => {
    const { errors, isValid } = useFormValidation(testSchema)
    expect(errors.value).toEqual({})
    expect(isValid.value).toBe(false)
  })

  it('should validate successfully with valid data', () => {
    const { validate, isValid } = useFormValidation(testSchema)

    const result = validate({ email: 'test@example.com', password: '123456' })

    expect(result).toBe(true)
    expect(isValid.value).toBe(true)
  })

  it('should return errors with invalid data', () => {
    const { validate, errors, isValid } = useFormValidation(testSchema)

    const result = validate({ email: 'invalid', password: '123' })

    expect(result).toBe(false)
    expect(isValid.value).toBe(false)
    expect(errors.value.email).toBe('Invalid email')
    expect(errors.value.password).toBe('Password too short')
  })

  it('should get field error', () => {
    const { validate, getFieldError } = useFormValidation(testSchema)

    validate({ email: 'invalid', password: '123' })

    expect(getFieldError('email')).toBe('Invalid email')
    expect(getFieldError('nonexistent')).toBe('')
  })

  it('should clear errors', () => {
    const { validate, clearErrors, errors, isValid } = useFormValidation(testSchema)

    validate({ email: 'invalid', password: '123' })
    expect(Object.keys(errors.value).length).toBeGreaterThan(0)

    clearErrors()
    expect(errors.value).toEqual({})
    expect(isValid.value).toBe(false)
  })
})

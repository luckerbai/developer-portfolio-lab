import { ref } from 'vue'
import type { ZodSchema } from 'zod'

export function useFormValidation<T>(schema: ZodSchema<T>) {
  const errors = ref<Record<string, string>>({})
  const isValid = ref(false)

  function validate(data: unknown): data is T {
    errors.value = {}
    const result = schema.safeParse(data)

    if (!result.success) {
      result.error.issues.forEach((issue) => {
        const path = issue.path.join('.')
        errors.value[path] = issue.message
      })
      isValid.value = false
      return false
    }

    isValid.value = true
    return true
  }

  function clearErrors() {
    errors.value = {}
    isValid.value = false
  }

  function getFieldError(field: string) {
    return errors.value[field] || ''
  }

  return {
    errors,
    isValid,
    validate,
    clearErrors,
    getFieldError,
  }
}

import { describe, expect, it } from "vitest"
import { Email } from "../../src/domain/value-object/email.vo"

describe('Email Value Object', () => {
  describe('create', () => {
    it('should be able to create a email with valid data', () => {
      const email = Email.create({ value: 'john.doe@example.com' })
      if (email.isLeft()) throw new Error(email.value.message)
      expect(email.value.raw.value).toBe('john.doe@example.com')
    })

    it('should not be able to create a email with invalid data', () => {
      const email = Email.create({ value: 'invalid-email' })
      expect(email.isLeft()).toBe(true)
      if (email.isLeft()) {
        expect(email.value.message).toBe('Invalid email')
      }
    })

    it('should not be able to create a email with empty data', () => {
      const email = Email.create({ value: null as any })
      expect(email.isLeft()).toBe(true)
      if (email.isLeft()) {
        expect(email.value.message).toBe('Invalid email')
      }
    })
  })
})
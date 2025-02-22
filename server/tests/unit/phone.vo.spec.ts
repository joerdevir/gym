import { describe, expect, it } from "vitest"
import { PhoneVO } from "../../src/domain/value-object/phone.vo"

describe('Phone Value Object', () => {
  describe('create', () => {
    it('should be able to create a phone with valid mobile number', () => {
      const phone = PhoneVO.create({ value: '85988023938' })
      if (phone.isLeft()) throw new Error(phone.value.message)
      expect(phone.value.raw.value).toBe('+5585988023938')
    })

    it('should not be able to create a phone with invalid number length', () => {
      const phone = PhoneVO.create({ value: '859880239380' })
      expect(phone.isLeft()).toBe(true)
      if (phone.isLeft()) {
        expect(phone.value.message).toBe('Invalid phone number: 859880239380')
      }
    })

    it('should not be able to create a phone with invalid number length (less than 09 digits)', () => {
      const phone = PhoneVO.create({ value: '85988023' })
      expect(phone.isLeft()).toBe(true)
      if (phone.isLeft()) {
        expect(phone.value.message).toBe('Invalid phone number: 85988023')
      }
    })

    it('should not be able to create a phone with invalid number length (greater than 11 digits)', () => {
      const phone = PhoneVO.create({ value: '859880239380' })
      expect(phone.isLeft()).toBe(true)
      if (phone.isLeft()) {
        expect(phone.value.message).toBe('Invalid phone number: 859880239380')
      }
    })
  })
})


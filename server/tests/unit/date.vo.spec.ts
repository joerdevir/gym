import { describe, expect, it } from "vitest"
import { DateVO } from "../../src/domain/value-object/date.vo"

describe('Date Value Object', () => {
  describe('create', () => {
    it('should be able to create a date with valid data', () => {
      const date = DateVO.create({ value: '2024-10-22T10:00:00.000Z' })
      if (date.isLeft()) throw new Error(date.value.message)
      expect(date.value.raw).toBe('2024-10-22T10:00:00.000Z')
    })

    it('should not be able to create a date with invalid format', () => {
      const date = DateVO.create({ value: 'invalid-date' })
      expect(date.isLeft()).toBe(true)
      if (date.isLeft()) {
        expect(date.value.message).toBe('Invalid date')
      }
    })

    it('should not be able to create a date with empty value', () => {
      const date = DateVO.create({ value: null as any })
      expect(date.isLeft()).toBe(true)
      if (date.isLeft()) {
        expect(date.value.message).toBe('Invalid date')
      }
    })

    it('should not be able to create a date before 1970-01-01', () => {
      const date = DateVO.create({ value: '1969-12-31T23:59:59.999Z' })
      expect(date.isLeft()).toBe(true)
      if (date.isLeft()) {
        expect(date.value.message).toBe('Only dates from 1970 to 2100 are allowed')
      }
    })

    it('should not be able to create a date after 2100-01-01', () => {
      const date = DateVO.create({ value: '2100-01-01T00:00:01.000Z' })
      expect(date.isLeft()).toBe(true)
      if (date.isLeft()) {
        expect(date.value.message).toBe('Only dates from 1970 to 2100 are allowed')
      }
    })

    it('should be able to create a date at minimum boundary (1970-01-01)', () => {
      const date = DateVO.create({ value: '1970-01-01T00:00:00.000Z' })
      if (date.isLeft()) throw new Error(date.value.message)
      expect(date.value.raw).toBe('1970-01-01T00:00:00.000Z')
    })

    it('should be able to create a date at maximum boundary (2100-01-01)', () => {
      const date = DateVO.create({ value: '2100-01-01T00:00:00.000Z' })
      if (date.isLeft()) throw new Error(date.value.message)
      expect(date.value.raw).toBe('2100-01-01T00:00:00.000Z')
    })
  })

  describe('restore', () => {
    it('should be able to restore a date from ISO string', () => {
      const dateString = '2024-10-22T10:00:00.000Z'
      const date = DateVO.restore(dateString)
      expect(date.raw).toBe(dateString)
    })
  })

  describe('getters', () => {
    it('should return the correct value', () => {
      const date = DateVO.create({ value: '2024-10-22T10:00:00.000Z' })
      if (date.isLeft()) throw new Error(date.value.message)
      expect(date.value.value.toISOString()).toBe('2024-10-22T10:00:00.000Z')
    })

    it('should return the correct raw value', () => {
      const date = DateVO.create({ value: '2024-10-22T10:00:00.000Z' })
      if (date.isLeft()) throw new Error(date.value.message)
      expect(date.value.raw).toBe('2024-10-22T10:00:00.000Z')
    })

    it('should return the correct ISO string', () => {
      const date = DateVO.create({ value: '2024-10-22T10:00:00.000Z' })
      if (date.isLeft()) throw new Error(date.value.message)
      expect(date.value.toISOString()).toBe('2024-10-22T10:00:00.000Z')
    })
  })
})


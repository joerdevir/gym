import { describe, expect, it } from "vitest"
import { UserNameVO } from "../../src/domain/aggregate/user/user.name.vo"

describe('UserName Value Object', () => {
  describe('create', () => {
    it('should be able to create a username with full name (first + last)', () => {
      const userName = UserNameVO.create({ full_name: 'John Doe' })
      if (userName.isLeft()) throw new Error(userName.value.message)
      
      expect(userName.value.raw.full_name).toBe('John Doe')
      expect(userName.value.raw.first_name).toBe('John')
      expect(userName.value.raw.last_name).toBe('Doe')
      expect(userName.value.raw.middle_name).toBeUndefined()
      expect(userName.value.raw.display_name).toBe('John Doe')
    })

    it('should be able to create a username with full name (first + middle + last)', () => {
      const userName = UserNameVO.create({ full_name: 'John Michael Doe' })
      if (userName.isLeft()) throw new Error(userName.value.message)
      
      expect(userName.value.raw.full_name).toBe('John Michael Doe')
      expect(userName.value.raw.first_name).toBe('John')
      expect(userName.value.raw.middle_name).toBe('Michael')
      expect(userName.value.raw.last_name).toBe('Doe')
      expect(userName.value.raw.display_name).toBe('John Doe')
    })

    it('should be able to create a username with multiple middle names', () => {
      const userName = UserNameVO.create({ full_name: 'John Michael Robert Doe' })
      if (userName.isLeft()) throw new Error(userName.value.message)
      
      expect(userName.value.raw.full_name).toBe('John Michael Robert Doe')
      expect(userName.value.raw.first_name).toBe('John')
      expect(userName.value.raw.middle_name).toBe('Michael Robert')
      expect(userName.value.raw.last_name).toBe('Doe')
      expect(userName.value.raw.display_name).toBe('John Doe')
    })

    it('should be able to create a username with single name', () => {
      const userName = UserNameVO.create({ full_name: 'John' })
      if (userName.isLeft()) throw new Error(userName.value.message)
      
      expect(userName.value.raw.full_name).toBe('John')
      expect(userName.value.raw.first_name).toBe('John')
      expect(userName.value.raw.last_name).toBe('John')
      expect(userName.value.raw.middle_name).toBeUndefined()
      expect(userName.value.raw.display_name).toBe('John John')
    })

    it('should trim extra spaces in full name', () => {
      const userName = UserNameVO.create({ full_name: '  John   Doe  ' })
      if (userName.isLeft()) throw new Error(userName.value.message)
      
      expect(userName.value.raw.full_name).toBe('  John   Doe  ')
      expect(userName.value.raw.first_name).toBe('John')
      expect(userName.value.raw.last_name).toBe('Doe')
    })

    it('should not be able to create a username with name too short', () => {
      const userName = UserNameVO.create({ full_name: 'Jo' })
      expect(userName.isLeft()).toBe(true)
      if (userName.isLeft()) {
        expect(userName.value.message).toBe('Name must be at least 3 characters long')
      }
    })

    it('should not be able to create a username with name too long', () => {
      const longName = 'a'.repeat(101)
      const userName = UserNameVO.create({ full_name: longName })
      expect(userName.isLeft()).toBe(true)
      if (userName.isLeft()) {
        expect(userName.value.message).toBe('Name must be less than 100 characters long')
      }
    })

    it('should not be able to create a username with empty name', () => {
      const userName = UserNameVO.create({ full_name: '' })
      expect(userName.isLeft()).toBe(true)
      if (userName.isLeft()) {
        expect(userName.value.message).toBe('Name must be at least 3 characters long')
      }
    })

    it('should not be able to create a username with null value', () => {
      const userName = UserNameVO.create({ full_name: null as any })
      expect(userName.isLeft()).toBe(true)
    })

    it('should not be able to create a username with undefined value', () => {
      const userName = UserNameVO.create({ full_name: undefined as any })
      expect(userName.isLeft()).toBe(true)
    })

    it('should be able to create a username with exactly 3 characters', () => {
      const userName = UserNameVO.create({ full_name: 'Joe' })
      if (userName.isLeft()) throw new Error(userName.value.message)
      
      expect(userName.value.raw.full_name).toBe('Joe')
      expect(userName.value.raw.first_name).toBe('Joe')
    })

    it('should be able to create a username with exactly 100 characters', () => {
      const validName = 'a'.repeat(100)
      const userName = UserNameVO.create({ full_name: validName })
      if (userName.isLeft()) throw new Error(userName.value.message)
      
      expect(userName.value.raw.full_name).toBe(validName)
    })

    it('should capitalize first letter of each name when input is lowercase', () => {
      const userName = UserNameVO.create({ full_name: 'john michael doe' })
      if (userName.isLeft()) throw new Error(userName.value.message)
      
      expect(userName.value.raw.first_name).toBe('John')
      expect(userName.value.raw.middle_name).toBe('Michael')
      expect(userName.value.raw.last_name).toBe('Doe')
      expect(userName.value.raw.display_name).toBe('John Doe')
    })

    it('should capitalize first letter of each name when input is uppercase', () => {
      const userName = UserNameVO.create({ full_name: 'JOHN MICHAEL DOE' })
      if (userName.isLeft()) throw new Error(userName.value.message)
      
      expect(userName.value.raw.first_name).toBe('John')
      expect(userName.value.raw.middle_name).toBe('Michael')
      expect(userName.value.raw.last_name).toBe('Doe')
      expect(userName.value.raw.display_name).toBe('John Doe')
    })

    it('should capitalize first letter of each name when input is mixed case', () => {
      const userName = UserNameVO.create({ full_name: 'jOhN mIcHaEl DoE' })
      if (userName.isLeft()) throw new Error(userName.value.message)
      
      expect(userName.value.raw.first_name).toBe('John')
      expect(userName.value.raw.middle_name).toBe('Michael')
      expect(userName.value.raw.last_name).toBe('Doe')
      expect(userName.value.raw.display_name).toBe('John Doe')
    })
  })

  describe('restore', () => {
    it('should be able to restore a username from raw data', () => {
      const raw = {
        full_name: 'John Michael Doe',
        display_name: 'John Doe',
        first_name: 'John',
        middle_name: 'Michael',
        last_name: 'Doe',
      }
      
      const userName = UserNameVO.restore(raw)
      
      expect(userName.raw.full_name).toBe('John Michael Doe')
      expect(userName.raw.display_name).toBe('John Doe')
      expect(userName.raw.first_name).toBe('John')
      expect(userName.raw.middle_name).toBe('Michael')
      expect(userName.raw.last_name).toBe('Doe')
    })

    it('should be able to restore a username without middle name', () => {
      const raw = {
        full_name: 'John Doe',
        display_name: 'John Doe',
        first_name: 'John',
        middle_name: undefined,
        last_name: 'Doe',
      }
      
      const userName = UserNameVO.restore(raw)
      
      expect(userName.raw.full_name).toBe('John Doe')
      expect(userName.raw.middle_name).toBeUndefined()
    })
  })

  describe('raw getter', () => {
    it('should return the raw data correctly', () => {
      const userName = UserNameVO.create({ full_name: 'John Michael Doe' })
      if (userName.isLeft()) throw new Error(userName.value.message)
      
      const raw = userName.value.raw
      
      expect(raw).toEqual({
        full_name: 'John Michael Doe',
        display_name: 'John Doe',
        first_name: 'John',
        middle_name: 'Michael',
        last_name: 'Doe',
      })
    })
  })
})


import { describe, expect, it } from "vitest"
import { UserRoleVO, UserRoleEnum } from "../../src/domain/aggregate/user/user.role.vo"

describe('UserRole Value Object', () => {
  describe('create', () => {
    it('should be able to create a user role with admin value', () => {
      const userRole = UserRoleVO.create({ value: UserRoleEnum.ADMIN })
      if (userRole.isLeft()) throw new Error(userRole.value.message)
      
      expect(userRole.value.raw.value).toBe(UserRoleEnum.ADMIN)
      expect(userRole.value.raw.value).toBe('admin')
    })

    it('should be able to create a user role with member value', () => {
      const userRole = UserRoleVO.create({ value: UserRoleEnum.MEMBER })
      if (userRole.isLeft()) throw new Error(userRole.value.message)
      
      expect(userRole.value.raw.value).toBe(UserRoleEnum.MEMBER)
      expect(userRole.value.raw.value).toBe('member')
    })

    it('should not be able to create a user role with invalid value', () => {
      const userRole = UserRoleVO.create({ value: 'invalid-role' as any })
      expect(userRole.isLeft()).toBe(true)
      if (userRole.isLeft()) {
        expect(userRole.value.message).toBe('Invalid role')
      }
    })

    it('should not be able to create a user role with null value', () => {
      const userRole = UserRoleVO.create({ value: null as any })
      expect(userRole.isLeft()).toBe(true)
      if (userRole.isLeft()) {
        expect(userRole.value.message).toBe('Invalid role | Must be a string')
      }
    })

    it('should not be able to create a user role with undefined value', () => {
      const userRole = UserRoleVO.create({ value: undefined as any })
      expect(userRole.isLeft()).toBe(true)
      if (userRole.isLeft()) {
        expect(userRole.value.message).toBe('Invalid role')
      }
    })

    it('should not be able to create a user role with empty string', () => {
      const userRole = UserRoleVO.create({ value: '' as any })
      expect(userRole.isLeft()).toBe(true)
      if (userRole.isLeft()) {
        expect(userRole.value.message).toBe('Invalid role')
      }
    })

    it('should not be able to create a user role with number value', () => {
      const userRole = UserRoleVO.create({ value: 123 as any })
      expect(userRole.isLeft()).toBe(true)
      if (userRole.isLeft()) {
        expect(userRole.value.message).toBe('Invalid role | Must be a string')
      }
    })
  })

  describe('restore', () => {
    it('should be able to restore a user role with admin value', () => {
      const userRole = UserRoleVO.restore('admin')
      
      expect(userRole.raw.value).toBe(UserRoleEnum.ADMIN)
      expect(userRole.raw.value).toBe('admin')
    })

    it('should be able to restore a user role with member value', () => {
      const userRole = UserRoleVO.restore('member')
      
      expect(userRole.raw.value).toBe(UserRoleEnum.MEMBER)
      expect(userRole.raw.value).toBe('member')
    })
  })

  describe('raw getter', () => {
    it('should return the raw data correctly for admin role', () => {
      const userRole = UserRoleVO.create({ value: UserRoleEnum.ADMIN })
      if (userRole.isLeft()) throw new Error(userRole.value.message)
      
      const raw = userRole.value.raw
      
      expect(raw).toEqual({
        value: 'admin',
      })
    })

    it('should return the raw data correctly for member role', () => {
      const userRole = UserRoleVO.create({ value: UserRoleEnum.MEMBER })
      if (userRole.isLeft()) throw new Error(userRole.value.message)
      
      const raw = userRole.value.raw
      
      expect(raw).toEqual({
        value: 'member',
      })
    })

    it('should return frozen object', () => {
      const userRole = UserRoleVO.create({ value: UserRoleEnum.ADMIN })
      if (userRole.isLeft()) throw new Error(userRole.value.message)
      
      const raw = userRole.value.raw
      
      expect(Object.isFrozen(raw)).toBe(true)
    })
  })
})


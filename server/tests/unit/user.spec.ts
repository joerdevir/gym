import { describe, it, expect } from 'vitest'
import { UserBuilder } from '../../src/domain/aggregate/user/user.root.builder'
import { UserRoleEnum } from '../../src/domain/aggregate/user/user.role.vo'

describe('User Aggregate', () => {
  describe('create', () => {
    it('should be able to create a user with valid data', () => {
    
      const user = new UserBuilder()
        .setFullName('John Doe')
        .setEmail('john.doe@example.com')
        .setPhone('85988023938')
        .setRole(UserRoleEnum.ADMIN)
        .build()

      expect(user.raw.full_name).toBe('John Doe')
      expect(user.raw.first_name).toBe('John')
      expect(user.raw.last_name).toBe('Doe')
      expect(user.raw.middle_name).toBeUndefined()
      expect(user.raw.display_name).toBe('John Doe')
      expect(user.raw.email).toBe('john.doe@example.com')
      expect(user.raw.phone).toBe('+5585988023938')
      expect(user.raw.role).toBe('admin')
    })
  })
})


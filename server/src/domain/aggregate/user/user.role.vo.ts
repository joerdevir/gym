import { ValueObject } from "../../../../core/domain/value-object";
import { EitherResult } from "../../../../core/either";

export enum UserRoleEnum {
  ADMIN = 'admin',
  MEMBER = 'member'
}

interface Props {
  value: UserRoleEnum
}

interface UserRoleRaw {
  value: string
}

const UserRoleCreateSchema = {
  type: 'object',
  properties: {
    value: { 
      type: 'string',
      enum: Object.values(UserRoleEnum),
      errorMessage: {
        enum: 'Invalid role',
        type: 'Must be a string',
      }
    }
  },
  required: ['value'],
  errorMessage: {
    required: {
      value: 'Invalid role'
    }
  }
}

export class UserRoleVO extends ValueObject<Props> {
  static create(props: Props): EitherResult<UserRoleVO> {
    const validation = this.validator.validate(UserRoleCreateSchema, props)
    if (validation.isLeft()) return this.either.left(validation.value)
    return this.either.right(new UserRoleVO(props))
  }

  static restore(raw: string): UserRoleVO {
    return new UserRoleVO({ value: raw as UserRoleEnum })
  }

  get raw(): UserRoleRaw {
    return Object.freeze({
      value: this.props.value,
    })
  }
}
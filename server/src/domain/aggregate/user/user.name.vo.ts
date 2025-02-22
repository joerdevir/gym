import { ValueObject } from "../../../../core/domain/value-object"
import { EitherResult } from "../../../../core/either"

interface Props {
  full_name: string
  display_name: string
  first_name: string
  middle_name: string | undefined
  last_name: string | undefined
}

export interface UserNameRaw {
  full_name: string
  display_name: string
  first_name: string
  middle_name: string | undefined
  last_name: string | undefined
}

interface UserCreateInputDTO {
  full_name: string
}

const UserCreateInputDTOSchema = {
  type: 'object',
  properties: {
    full_name: {
      type: 'string',
      minLength: 3,
      maxLength: 100,
      errorMessage: {
        required: 'Name is required' ,
        minLength: 'Name must be at least 3 characters long',
        maxLength: 'Name must be less than 100 characters long',
      } 
    }
  },
  required: ['full_name']
}

export class UserNameVO extends ValueObject<Props> {

  static create(props: UserCreateInputDTO): EitherResult<UserNameVO> {
    const validation = this.validator.validate(UserCreateInputDTOSchema, props)
    if (validation.isLeft()) return this.either.left(validation.value)
    
    const fullName = props.full_name.trim().split(' ').map((name) => name.charAt(0).toUpperCase() + name.slice(1).toLowerCase())
    
    return this.either.right(new UserNameVO({
      full_name: props.full_name,
      display_name: `${fullName[0]} ${fullName[fullName.length - 1]}`,
      first_name: fullName[0],
      middle_name: fullName.slice(1, -1).join(' ').trim() || undefined,
      last_name: fullName[fullName.length - 1],
    }))
  }

  static restore(raw: UserNameRaw): UserNameVO {
    return new UserNameVO({
      full_name: raw.full_name,
      display_name: raw.display_name,
      first_name: raw.first_name,
      middle_name: raw.middle_name,
      last_name: raw.last_name,
    })
  }

  get raw(): UserNameRaw {
    return Object.freeze({
      full_name: this.props.full_name,
      display_name: this.props.display_name,
      first_name: this.props.first_name,
      middle_name: this.props.middle_name,
      last_name: this.props.last_name,
    })
  }
}
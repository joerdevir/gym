import { AggregateRoot } from "../../../../core/domain/aggregate-root"
import { UniqueEntityID } from "../../../../core/domain/unique-entity-id"
import { EitherResult } from "../../../../core/either"
import { Email } from "../../value-object/email.vo"
import { PhoneVO } from "../../value-object/phone.vo"
import { UserRoleVO } from "./user.role.vo"
import { UserNameVO } from "./user.name.vo"
import { UserPropsSchema } from "./user.root.schema"

interface UserProps {
  name: UserNameVO
  email: Email
  phone: PhoneVO | undefined
  role: UserRoleVO
}

export interface UserRaw {
  user_id: string
  full_name: string
  display_name: string
  first_name: string
  middle_name: string | undefined
  last_name: string | undefined
  email: string
  phone: string | undefined
  role: string
}

export class User extends AggregateRoot<UserProps>{

  static create(props: UserProps, id: UniqueEntityID): EitherResult<User> {
    const validation = this.validator.validate(UserPropsSchema, props)
    if (validation.isLeft()) return this.either.left(validation.value)
    return this.either.right(new User(props, id))
  }

  static restore(raw: UserRaw): User {
    return new User({
      name: UserNameVO.restore({
        full_name: raw.full_name,
        display_name: raw.display_name,
        first_name: raw.first_name,
        middle_name: raw.middle_name,
        last_name: raw.last_name,
      }),
      email: Email.restore({ value: raw.email }),
      phone: raw.phone ? PhoneVO.restore(raw.phone) : undefined,
      role: UserRoleVO.restore(raw.role),
    }, UniqueEntityID.restore(raw.user_id))
  }

  get raw(): UserRaw {
    return Object.freeze({
      user_id: this.id.toString(),
      full_name: this.props.name.raw.full_name,
      display_name: this.props.name.raw.display_name,
      first_name: this.props.name.raw.first_name,
      middle_name: this.props.name.raw.middle_name,
      last_name: this.props.name.raw.last_name,
      email: this.props.email.raw.value,  
      phone: this.props.phone?.raw?.value,
      role: this.props.role.raw.value,
    })
  }
}
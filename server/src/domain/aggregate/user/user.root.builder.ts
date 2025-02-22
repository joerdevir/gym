import { Component } from "../../../../core/component"
import { UniqueEntityID } from "../../../../core/domain/unique-entity-id"
import { EitherResult } from "../../../../core/either"
import { Email } from "../../value-object/email.vo"
import { PhoneVO } from "../../value-object/phone.vo"
import { User } from "./user.root"
import { UserNameVO } from "./user.name.vo"
import { UserRoleEnum, UserRoleVO } from "./user.role.vo"

export class UserBuilder extends Component {
  private full_name: string
  private email: string
  private phone: string | undefined
  private role: UserRoleEnum

  constructor() {
    super()
    this.full_name = ''
    this.email = ''
    this.phone = undefined
    this.role = UserRoleEnum.MEMBER
  }

  setFullName(full_name: string): UserBuilder {
    this.full_name = full_name
    return this
  }

  setEmail(email: string): UserBuilder {
    this.email = email
    return this
  }
  
  setPhone(phone: string): UserBuilder {
    this.phone = phone
    return this
  }

  setRole(role: UserRoleEnum): UserBuilder {
    this.role = role
    return this
  }

  build(): EitherResult<User> {
    const name = UserNameVO.create({ full_name: this.full_name })
    if (name.isLeft()) return this.either.left(name.value)

    const email = Email.create({ value: this.email })
    if (email.isLeft()) return this.either.left(email.value)

    let phone: PhoneVO | undefined
    if (this.phone) {
      const result = PhoneVO.create({ value: this.phone })
      if (result.isLeft()) return this.either.left(result.value)
      phone = result.value
    }

    const role = UserRoleVO.create({ value: this.role })
    if (role.isLeft()) return this.either.left(role.value)

    return User.create({
      name: name.value,
      email: email.value,
      phone: phone,
      role: role.value,
    }, UniqueEntityID.UUIDv7())
  }
}
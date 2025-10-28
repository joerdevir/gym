import { Component } from "../../../../core/component"
import { UniqueEntityID } from "../../../../core/domain/unique-entity-id"
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
  
  setPhone(phone: string | undefined): UserBuilder {
    this.phone = phone
    return this
  }

  setRole(role: UserRoleEnum): UserBuilder {
    this.role = role
    return this
  }

  build(): User {
    const name = UserNameVO.create({ full_name: this.full_name })
    if (name.isLeft()) throw new Error(name.value.message)

    const email = Email.create({ value: this.email })
    if (email.isLeft()) throw new Error(email.value.message)

    let phone: PhoneVO | undefined
    if (this.phone) {
      const result = PhoneVO.create({ value: this.phone })
      if (result.isLeft()) throw new Error(result.value.message)
      phone = result.value
    }

    const role = UserRoleVO.create({ value: this.role })
    if (role.isLeft()) throw new Error(role.value.message)

    const user = User.create({
      name: name.value,
      email: email.value,
      phone: phone,
      role: role.value,
    }, UniqueEntityID.UUIDv7())
    if (user.isLeft()) throw new Error(user.value.message)

    return user.value
  }
}
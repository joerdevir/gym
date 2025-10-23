import { Component } from "../../../../core/component"
import { UniqueEntityID } from "../../../../core/domain/unique-entity-id"
import { EitherResult } from "../../../../core/either"
import { Email } from "../../value-object/email.vo"
import { PhoneVO } from "../../value-object/phone.vo"
import { Organization } from "./organization.root"
import { OrganizationNameVO } from "./organization.name.vo"
import { OrganizationStatusEnum, OrganizationStatusVO } from "./organization.status.vo"

export class OrganizationBuilder extends Component {
  private display_name: string | undefined
  private legal_name: string | undefined
  private email: string | undefined
  private phone: string | undefined
  private status: OrganizationStatusEnum

  constructor() {
    super()
    this.display_name = undefined
    this.legal_name = undefined
    this.email = undefined
    this.phone = undefined
    this.status = OrganizationStatusEnum.ACTIVE
  }

  setDisplayName(display_name: string): OrganizationBuilder {
    this.display_name = display_name
    return this
  }

  setLegalName(legal_name: string): OrganizationBuilder {
    this.legal_name = legal_name
    return this
  }

  setEmail(email: string): OrganizationBuilder {
    this.email = email
    return this
  }
  
  setPhone(phone: string): OrganizationBuilder {
    this.phone = phone
    return this
  }

  setStatus(status: OrganizationStatusEnum): OrganizationBuilder {
    this.status = status
    return this
  }

  build(): EitherResult<Organization> {
    const name = OrganizationNameVO.create({
      display_name: this.display_name!,
      legal_name: this.legal_name
    })
    if (name.isLeft()) return this.either.left(name.value)

    let email: Email | undefined
    if (this.email) {
      const result = Email.create({ value: this.email })
      if (result.isLeft()) return this.either.left(result.value)
      email = result.value
    }

    let phone: PhoneVO | undefined
    if (this.phone) {
      const result = PhoneVO.create({ value: this.phone })
      if (result.isLeft()) return this.either.left(result.value)
      phone = result.value
    }

    const status = OrganizationStatusVO.create({ value: this.status })
    if (status.isLeft()) return this.either.left(status.value)

    return Organization.create({
      name: name.value,
      email: email,
      phone: phone,
      status: status.value,
    }, UniqueEntityID.UUIDv7())
  }
}


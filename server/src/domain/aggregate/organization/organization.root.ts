import { AggregateRoot } from "../../../../core/domain/aggregate-root"
import { UniqueEntityID } from "../../../../core/domain/unique-entity-id"
import { EitherResult } from "../../../../core/either"
import { Email } from "../../value-object/email.vo"
import { PhoneVO } from "../../value-object/phone.vo"
import { OrganizationNameVO } from "./organization.name.vo"
import { OrganizationStatusVO } from "./organization.status.vo"
import { OrganizationPropsSchema } from "./organization.root.schema"

interface OrganizationProps {
  name: OrganizationNameVO
  email: Email | undefined
  phone: PhoneVO | undefined
  status: OrganizationStatusVO
}

export interface OrganizationRaw {
  organization_id: string
  display_name: string
  legal_name: string | undefined
  email: string | undefined
  phone: string | undefined
  status: string
} 

export class Organization extends AggregateRoot<OrganizationProps>{

  static create(props: OrganizationProps, id: UniqueEntityID): EitherResult<Organization> {
    const validation = this.validator.validate(OrganizationPropsSchema, props)
    if (validation.isLeft()) return this.either.left(validation.value)
    return this.either.right(new Organization(props, id))
  }

  static restore(raw: OrganizationRaw): Organization {
    return new Organization({
      name: OrganizationNameVO.restore({
        display_name: raw.display_name,
        legal_name: raw.legal_name,
      }),
      email: raw.email ? Email.restore({ value: raw.email }) : undefined,
      phone: raw.phone ? PhoneVO.restore(raw.phone) : undefined,
      status: OrganizationStatusVO.restore(raw.status),
    }, UniqueEntityID.restore(raw.organization_id))
  }

  get raw(): OrganizationRaw {
    return Object.freeze({
      organization_id: this.id.toString(),
      display_name: this.props.name.raw.display_name,
      legal_name: this.props.name.raw.legal_name,
      email: this.props.email?.raw?.value,
      phone: this.props.phone?.raw?.value,
      status: this.props.status.raw.value,
    })
  }

  isActive(): boolean {
    return this.props.status.isActive()
  }

  activate(): void {
    this.props.status = OrganizationStatusVO.restore('active')
  }

  deactivate(): void {
    this.props.status = OrganizationStatusVO.restore('inactive')
  }

  suspend(): void {
    this.props.status = OrganizationStatusVO.restore('suspended')
  }
}


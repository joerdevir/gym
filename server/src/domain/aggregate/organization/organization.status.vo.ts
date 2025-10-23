import { ValueObject } from "../../../../core/domain/value-object";
import { EitherResult } from "../../../../core/either";

export enum OrganizationStatusEnum {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  SUSPENDED = 'suspended'
}

interface Props {
  value: OrganizationStatusEnum
}

interface OrganizationStatusRaw {
  value: string
}

const OrganizationStatusCreateSchema = {
  type: 'object',
  properties: {
    value: { 
      type: 'string',
      enum: Object.values(OrganizationStatusEnum),
      errorMessage: {
        enum: 'Invalid status',
        type: 'Must be a string',
      }
    }
  },
  required: ['value'],
  errorMessage: {
    required: {
      value: 'Invalid status'
    }
  }
}

export class OrganizationStatusVO extends ValueObject<Props> {
  static create(props: Props): EitherResult<OrganizationStatusVO> {
    const validation = this.validator.validate(OrganizationStatusCreateSchema, props)
    if (validation.isLeft()) return this.either.left(validation.value)
    return this.either.right(new OrganizationStatusVO(props))
  }

  static restore(raw: string): OrganizationStatusVO {
    return new OrganizationStatusVO({ value: raw as OrganizationStatusEnum })
  }

  get raw(): OrganizationStatusRaw {
    return Object.freeze({
      value: this.props.value,
    })
  }

  isActive(): boolean {
    return this.props.value === OrganizationStatusEnum.ACTIVE
  }

  isInactive(): boolean {
    return this.props.value === OrganizationStatusEnum.INACTIVE
  }

  isSuspended(): boolean {
    return this.props.value === OrganizationStatusEnum.SUSPENDED
  }
}


import { ValueObject } from "../../../../core/domain/value-object"
import { EitherResult } from "../../../../core/either"

interface Props {
  display_name: string
  legal_name: string | undefined
}

export interface OrganizationNameRaw {
  display_name: string
  legal_name: string | undefined
}

interface OrganizationNameCreateInputDTO {
  display_name: string
  legal_name: string | undefined
}

const OrganizationNameCreateInputDTOSchema = {
  type: 'object',
  properties: {
    display_name: {
      type: 'string',
      minLength: 2,
      maxLength: 100,
      errorMessage: {
        required: 'Display name is required',
        minLength: 'Display name must be at least 2 characters long',
        maxLength: 'Display name must be less than 100 characters long',
      }
    },
    legal_name: {
      type: ['string', 'null'],
      nullable: true,
      minLength: 2,
      maxLength: 200,
      errorMessage: {
        required: 'Legal name is required',
        minLength: 'Legal name must be at least 2 characters long',
        maxLength: 'Legal name must be less than 200 characters long',
      }
    }
  },
  required: ['display_name']
}

export class OrganizationNameVO extends ValueObject<Props> {

  static create(props: OrganizationNameCreateInputDTO): EitherResult<OrganizationNameVO> {
    const validation = this.validator.validate(OrganizationNameCreateInputDTOSchema, props)
    if (validation.isLeft()) return this.either.left(validation.value)
    
    return this.either.right(new OrganizationNameVO({
      display_name: props.display_name.trim(),
      legal_name: props.legal_name?.trim() || undefined,
    }))
  }

  static restore(raw: OrganizationNameRaw): OrganizationNameVO {
    return new OrganizationNameVO({
      display_name: raw.display_name,
      legal_name: raw.legal_name,
    })
  }

  get raw(): OrganizationNameRaw {
    return Object.freeze({
      display_name: this.props.display_name,
      legal_name: this.props.legal_name,
    })
  }
}


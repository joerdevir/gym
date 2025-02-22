import { ValueObject } from "../../../core/domain/value-object"
import { EitherResult } from "../../../core/either"

interface Props {
  value: string
}

interface EmailRaw {
  value: string
}

const EmailCreateSchema = {
  type: 'object',
  properties: {
    value: { 
      type: 'string',
      format: 'email',
      errorMessage: {
        format: 'Invalid email',
        type: 'Invalid email',
        required: 'Invalid email',
        empty: 'Invalid email',
      }
    }
  },
  required: ['value']
}

export class Email extends ValueObject<Props> {
  static create(props: Props): EitherResult<Email> {
    const validation = this.validator.validate(EmailCreateSchema, props)
    if (validation.isLeft()) return this.either.left(validation.value)
    return this.either.right(new Email(props))
  }

  static restore(raw: Props): Email {
    return new Email(raw)
  }

  get raw(): EmailRaw {
    return Object.freeze({
      value: this.props.value,
    })
  }
}
import libphonenumber from 'libphonenumber-js'
import { ValueObject } from "../../../core/domain/value-object";
import { EitherResult } from "../../../core/either";
import { HttpStatusCode } from '../../../core/enum/http-status-code.enum';
import { AppError } from '../../../core/error/app-error';

interface Props {
  value: string // E164Number Format
}

interface PhoneRaw {
  value: string
}

export class PhoneVO extends ValueObject<Props> {
  static create(props: Props): EitherResult<PhoneVO> {
    try {
      const phone = libphonenumber(props.value, { defaultCountry: 'BR' })
      if (!phone?.isValid()) return this.either.left(new InvalidPhone(`Invalid phone number: ${props.value}`))
      if (!phone?.isPossible()) return this.either.left(new InvalidPhone('Phone number is not possible'))
      return this.either.right(new PhoneVO({ value: phone.number.toString() }))
    } catch (error: any) {
      console.error(new Error('Invalid phone number'))
      return this.either.left(new InvalidPhone('Invalid phone number'))
    }
  }

  static restore(raw: string): PhoneVO {
    return new PhoneVO({ value: raw })
  }

  get raw(): PhoneRaw {
    return Object.freeze({
      value: this.props.value,
    })
  }
}

class InvalidPhone extends AppError {
  constructor(message: string) {
    super({
      message,
      status: HttpStatusCode.BAD_REQUEST
    })
  }
}
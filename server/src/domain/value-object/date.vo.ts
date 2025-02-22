import { EitherResult } from '../../../core/either'
import { AppError } from '../../../core/error/app-error'
import { ValueObject } from '../../../core/domain/value-object'
import { HttpStatusCode } from '../../../core/enum/http-status-code.enum'
import dayjs, { Dayjs } from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc)

interface Props {
  value: Dayjs
}

interface CreateInput {
  value: string
}

const MIN_DATE = dayjs('1970-01-01T00:00:00.000Z')
const MAX_DATE = dayjs('2100-01-01T00:00:00.000Z')

export class DateVO extends ValueObject<Props> {
  static create(props: CreateInput): EitherResult<DateVO> {
    const date = dayjs.utc(props.value)
    if (!date.isValid()) return this.either.left(new InvalidDate('Invalid date'))
    if (date.isBefore(MIN_DATE) || date.isAfter(MAX_DATE)) return this.either.left(new InvalidDate('Only dates from 1970 to 2100 are allowed'))
    return this.either.right(new DateVO({ value: date }))
  }

  static restore(raw: string): DateVO {
    const date = dayjs.utc(raw)
    return new DateVO({ value: date })
  }
  
  get value() { return this.props.value }
  get raw() { return this.value.toISOString() }

  toISOString() { return this.raw }
}

class InvalidDate extends AppError {
  constructor(message: string) {
    super({
      message,
      status: HttpStatusCode.BAD_REQUEST
    })
  }
}

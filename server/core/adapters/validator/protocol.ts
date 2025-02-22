import { EitherResult } from '../../either';

export interface ValidatorProtocol {
  validate(schema: object, data: Record<string, any>): EitherResult<void>
}
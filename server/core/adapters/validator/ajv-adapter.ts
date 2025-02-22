import ajvFormats from 'ajv-formats';
import Ajv from "ajv";
import { either, Either, EitherResult } from "../../either";
import {ValidatorProtocol} from "./protocol";
import { ValidationError, ValidationCompileError } from "./validator.error";
import ajvErrors from 'ajv-errors';
import { Email } from '../../../src/domain/value-object/email.vo';
import { PhoneVO } from '../../../src/domain/value-object/phone.vo';

class AjvAdapter implements ValidatorProtocol {
  readonly #either: Either

  readonly #ajv = new Ajv({ 
    allErrors: true,
    removeAdditional: true,
    allowUnionTypes: true,
    $data: true
  })

  constructor() {
    this.#either = either;
    ajvFormats(this.#ajv)
    ajvErrors(this.#ajv, {
      singleError: " | ",
      keepErrors: false
    })
  }

  public validate(schema: object, data: Record<string, any> | string | number): EitherResult<void> {
    try {
      const validate = this.#ajv.compile(schema)
      if (!validate(data)) {
        return this.#either.left(new ValidationError(validate.errors))
      }
    } catch (error: any) {
      return this.#either.left(new ValidationCompileError(error));
    }

    return this.#either.right(undefined)
  }
}

export const ajvAdapter = new AjvAdapter()
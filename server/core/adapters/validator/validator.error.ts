import { ErrorObject } from 'ajv';
import { HttpStatusCode } from '../../enum/http-status-code.enum';
import { AppError } from '../../error/app-error';

export class ValidationError extends AppError {
  constructor(errors?: ErrorObject[] | null | undefined) {
    console.error('[VALIDATION_ERROR]', JSON.stringify(errors, null, 2))
    super({
      message: errors?.map((error: ErrorObject) => error.message).join(' - ') || 'Validation error', 
      status: HttpStatusCode.BAD_REQUEST,
      originError: errors
    })
  }
}

export class ValidationCompileError extends AppError {
  constructor(errors: any) {
    super({
      message: `Error compiling the schema`,
      status: HttpStatusCode.BAD_REQUEST,
      originError: errors
    })
  }
}

export class InvalidFinancialAccountError extends AppError {
  constructor(originError: any, value: string) {
    super({
      message: `Invalid financial value - "${value}" it's not a valid financial value`,
      status: HttpStatusCode.BAD_REQUEST,
      originError,
    })
  }
}

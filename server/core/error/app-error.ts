import {Environment} from '../enum/env.enum';
import { type HttpStatusCode } from '../enum/http-status-code.enum';

export interface ErrorOutput {
  name: string
  message: string
  originError?: any
}

export interface ErrorInput {
  message: string
  status: HttpStatusCode
  originError?: any
}

export const ErrorColors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  reset: '\x1b[0m',
}

export function errColor(text: string, color: keyof typeof ErrorColors): string {
  return `${ErrorColors[color]} ${text} ${ErrorColors.reset}`
}

interface Props {
  message: string
  status: HttpStatusCode
  originError?: any
}

export class AppError extends Error {
  public readonly ok: boolean = false
  public readonly status: HttpStatusCode
  public readonly originError: any
  public readonly message: string
  
  constructor(props: Props) {
    super(props.message)
    this.name = this.constructor.name
    this.status = props.status
    this.originError = props.originError
    this.message = props.message
    this.ok = false
    console.error(this)
    Error.captureStackTrace(this, this.constructor)
  }

  get error(): ErrorOutput {
    return {
      name: this.name,
      message: this.message,
      originError: process.env.NODE_ENV === Environment.PRODUCTION ? null : this.originError,
    }
  }

  getError(): ErrorOutput {
    return this.error
  }
}
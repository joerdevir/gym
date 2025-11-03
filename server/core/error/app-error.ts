import {Environment} from '../enum/env.enum';
import { type HttpStatusCode } from '../enum/http-status-code.enum';

export interface ErrorOutput {
  name: string
  message: string
  status: HttpStatusCode
  originError?: any
}

export interface ErrorInput {
  message: string
  status: HttpStatusCode
  originError?: any
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
      status: this.status,
      originError: process.env.NODE_ENV === Environment.PRODUCTION ? null : this.originError,
    }
  }
}
import { AppError } from "./error/app-error"

export type EitherProps<L, R> = Left<L, R> | Right<L, R>
export type EitherResult<T> = EitherProps<AppError, T>

export class Left<L, R> {
  readonly value: L

  constructor(value: L) { 
    this.value = value 
  }

  isLeft(): this is Left<L, R> { return true }
  isRight(): this is Right<L, R> { return false }
}

export class Right<L, R> {
  readonly value: R

  constructor(value: R) {
    this.value = value
  }

  isLeft(): this is Left<L, R> { return false }
  isRight(): this is Right<L, R> { return true }
}

export class Either {
  left = <L, R>(l: L): Left<L, R> => new Left<L, R>(l)
  right = <L, R>(r: R): Right<L, R> => new Right<L, R>(r)
}

export const either = new Either()

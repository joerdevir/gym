import { Usecase } from "../../../core/application/usecase";
import { EitherResult } from "../../../core/either";
import { AppError } from "../../../core/error/app-error";
import { UserRepo } from "../../domain/aggregate/user/user.repository";
import { CognitoSignIn } from "../../infra/cognito/cognito.sign-in";
import { PostgresAdapter } from "../../infra/database/postgres/postgres.adapter";
import { env } from "../../infra/config/env";

interface Props {
  userRepo: UserRepo
  postgres: PostgresAdapter
  cognito: CognitoSignIn
}

interface Input {
  email: string
  password: string
}

interface Output {
  accessToken: string
  idToken: string
  refreshToken: string
}

export class SignInUsecase extends Usecase {
  readonly #cognito: CognitoSignIn

  constructor(props: Props) {
    super()
    this.#cognito = props.cognito
  }

  async execute(input: Input): Promise<EitherResult<Output>> {
    const signIn = await this.#cognito.execute({
      ClientId: env.COGNITO_CLIENT_ID,
      AuthFlow: 'USER_PASSWORD_AUTH',
      AuthParameters: {
        USERNAME: input.email,
        PASSWORD: input.password,
      },
    })
    if (signIn.isLeft()) return this.either.left(signIn.value)

    const tokens = signIn.value.AuthenticationResult
    if (!tokens?.AccessToken || !tokens?.IdToken || !tokens?.RefreshToken) {
      return this.either.left(new MissingAuthTokensError())
    }

    return this.either.right({
      accessToken: tokens.AccessToken,
      idToken: tokens.IdToken,
      refreshToken: tokens.RefreshToken,
    })
  }
}

class MissingAuthTokensError extends AppError {
  constructor() {
    super({
      message: 'Missing authentication tokens',
      status: 500,
    })
  }
}

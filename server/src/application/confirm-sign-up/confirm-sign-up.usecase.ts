import { Usecase } from "../../../core/application/usecase";
import { EitherResult } from "../../../core/either";
import { CognitoAdapter } from "../../infra/cognito/cognito.adapter";
import { env } from "../../infra/config/env";

interface Props {
  cognito: CognitoAdapter
}

interface Input {
  email: string
  confirmation_code: string
}

export class ConfirmSignUpUsecase extends Usecase {
  readonly #cognito: CognitoAdapter

  constructor(props: Props) {
    super()
    this.#cognito = props.cognito
  }

  async execute(input: Input): Promise<EitherResult<void>> {
    const confirmSignUp = await this.#cognito.confirmSignUp({
      ClientId: env.COGNITO_CLIENT_ID,
      Username: input.email,
      ConfirmationCode: input.confirmation_code,
    })
    if (confirmSignUp.isLeft()) return this.either.left(confirmSignUp.value)

    return this.either.right(undefined)
  }
}


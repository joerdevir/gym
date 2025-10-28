import { Usecase } from "../../../core/application/usecase";
import { EitherResult } from "../../../core/either";
import { CognitoConfirmSignUp } from "../../infra/cognito/cognito.confirm-sign-up";
import { env } from "../../infra/config/env";

interface Props {
  cognito: CognitoConfirmSignUp
}

interface Input {
  email: string
  confirmation_code: string
}

export class ConfirmSignUpUsecase extends Usecase {
  readonly #cognito: CognitoConfirmSignUp

  constructor(props: Props) {
    super()
    this.#cognito = props.cognito
  }

  async execute(input: Input): Promise<EitherResult<void>> {
    const confirmSignUp = await this.#cognito.execute({
      ClientId: env.COGNITO_CLIENT_ID,
      Username: input.email,
      ConfirmationCode: input.confirmation_code,
    })
    if (confirmSignUp.isLeft()) return this.either.left(confirmSignUp.value)

    return this.either.right(undefined)
  }
}


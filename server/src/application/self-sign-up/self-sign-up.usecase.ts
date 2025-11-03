import { Usecase } from "../../../core/application/usecase";
import { EitherResult } from "../../../core/either";
import { Environment } from "../../../core/enum/env.enum";
import { UserRoleEnum } from "../../domain/aggregate/user/user.role.vo";
import { CognitoSignUp } from "../../infra/cognito/cognito.sign-up";
import { env } from "../../infra/config/env";
import { SelfSignUpInputSchema } from "./self-sign-up.schema";

interface Props {
  cognitoSignUp: CognitoSignUp
}

interface SelfSignUpUsecaseInputDTO {
  full_name: string
  email: string
  phone: string | undefined
  password: string
}

export class SelfSignUpUsecase extends Usecase {
  readonly #cognitoSignUp: CognitoSignUp

  constructor(props: Props) {
    super()
    this.#cognitoSignUp = props.cognitoSignUp
  }

  async execute(input: SelfSignUpUsecaseInputDTO): Promise<EitherResult<void>> {
    const validation = this.validator.validate(SelfSignUpInputSchema, input)
    if (validation.isLeft()) return this.either.left(validation.value)

    if (env.NODE_ENV !== Environment.TEST) {
      const signUp = await this.#cognitoSignUp.execute({
        ClientId: env.COGNITO_CLIENT_ID,
        Username: input.email,
        Password: input.password,
        UserAttributes: [
          { Name: 'full_name', Value: input.full_name },
          { Name: 'email', Value: input.email },
          { Name: 'phone', Value: input.phone },
          { Name: 'role', Value: UserRoleEnum.GUEST },
          { Name: 'onboarded', Value: 'no' },
        ],
      })
      if (signUp.isLeft()) return this.either.left(signUp.value)
    }

    return this.either.right(undefined)
  }
}
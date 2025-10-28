import { Usecase } from "../../../core/application/usecase";
import { EitherResult } from "../../../core/either";
import { UserRoleEnum } from "../../domain/aggregate/user/user.role.vo";
import { CognitoSignUp } from "../../infra/cognito/cognito.sign-up";
import { env } from "../../infra/config/env";

interface Props {
  cognitoSignUp: CognitoSignUp
}

interface Input {
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

  async execute(input: Input): Promise<EitherResult<void>> {
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

    

    return this.either.right(undefined)
  }
}
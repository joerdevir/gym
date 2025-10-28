import { Usecase } from "../../../core/application/usecase";
import { EitherResult } from "../../../core/either";
import { UserRepo } from "../../domain/aggregate/user/user.repository";
import { UserRoleEnum } from "../../domain/aggregate/user/user.role.vo";
import { UserRaw } from "../../domain/aggregate/user/user.root";
import { UserBuilder } from "../../domain/aggregate/user/user.root.builder";
import { CognitoAdapter } from "../../infra/cognito/cognito.adapter";
import { PostgresAdapter } from "../../infra/database/postgres/postgres.adapter";
import { env } from "../../infra/config/env";

interface Props {
  userRepo: UserRepo
  postgres: PostgresAdapter
  cognito: CognitoAdapter
}

interface Input {
  full_name: string
  email: string
  phone: string | undefined
  password: string
}

export class SignUpUsecase extends Usecase {
  readonly #cognito: CognitoAdapter

  constructor(props: Props) {
    super()
    this.#cognito = props.cognito
  }

  async execute(input: Input): Promise<EitherResult<void>> {
    const signUp = await this.#cognito.signUp({
      ClientId: env.COGNITO_CLIENT_ID,
      Username: input.email,
      Password: input.password,
      UserAttributes: [
        { Name: 'full_name', Value: input.full_name },
        { Name: 'email', Value: input.email },
        { Name: 'phone', Value: input.phone },
        { Name: 'role', Value: UserRoleEnum.MEMBER },
      ],
    })
    if (signUp.isLeft()) return this.either.left(signUp.value)

    return this.either.right(undefined)
  }
}
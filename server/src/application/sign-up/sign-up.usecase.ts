import { Usecase } from "../../../core/application/usecase";
import { EitherResult } from "../../../core/either";
import { UserRepo } from "../../domain/aggregate/user/user.repository";
import { UserRoleEnum } from "../../domain/aggregate/user/user.role.vo";
import { UserRaw } from "../../domain/aggregate/user/user.root";
import { UserBuilder } from "../../domain/aggregate/user/user.root.builder";

interface Props {
  userRepo: UserRepo
}

interface Input {
  full_name: string
  email: string
  phone: string | undefined
  role: UserRoleEnum
}

export class SignUpUsecase extends Usecase {
  readonly #userRepo: UserRepo
  readonly #builder = new UserBuilder()

  constructor(props: Props) {
    super()
    this.#userRepo = props.userRepo
  }

  async execute(input: Input): Promise<EitherResult<UserRaw>> {
    this.#builder.setFullName(input.full_name)
    this.#builder.setEmail(input.email)
    this.#builder.setPhone(input.phone)
    this.#builder.setRole(input.role)
    const user = this.#builder.build()

    const save = await this.#userRepo.save(user)
    if (save.isLeft()) return this.either.left(save.value)

    return this.either.right(save.value)
  }
}
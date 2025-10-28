import { Repo } from "../../../core/domain/repo";
import { EitherResult } from "../../../core/either";
import { HttpStatusCode } from "../../../core/enum/http-status-code.enum";
import { AppError } from "../../../core/error/app-error";
import { UserRepo, UserRepoFindByIdInput } from "../../domain/aggregate/user/user.repository";
import { User, UserRaw } from "../../domain/aggregate/user/user.root";
import { DynamoAdapter } from "../database/dynamo/dynamo.adapter";

interface Props {
  dynamo: DynamoAdapter
}

export class UserDatabaseRepo extends Repo implements UserRepo {
  readonly #dynamo: DynamoAdapter
  readonly #tableName: string = 'organization-control'

  constructor(props: Props) {
    super()
    this.#dynamo = props.dynamo
  }

  async save(user: User): Promise<EitherResult<UserRaw>> {
    const result = await this.#dynamo.put({
      TableName: this.#tableName,
      Item: {
        pk: `USER:${user.raw.user_id}`,
        ...user.raw,
      },
    })
    if (result.isLeft()) return this.either.left(result.value)
    return this.either.right(user.raw)
  }

  async findById(input: UserRepoFindByIdInput): Promise<EitherResult<User>> {
    const result = await this.#dynamo.get({
      TableName: this.#tableName,
      Key: {
        pk: `USER:${input.user_id}`,
      },
    })
    if (result.isLeft()) return this.either.left(result.value)

    if (!result.value?.Item) return this.either.left(new UserNotFoundError())

    return this.either.right(User.restore(result.value.Item as UserRaw))
  }

  async delete(id: string): Promise<EitherResult<void>> {
    return this.either.right(undefined)
  }
}

class UserNotFoundError extends AppError {
  constructor() {
    super({
      message: `User not found`,
      status: HttpStatusCode.NOT_FOUND,
    })
  }
}
import { Repo } from "../../../core/domain/repo";
import { EitherResult } from "../../../core/either";
import { HttpStatusCode } from "../../../core/enum/http-status-code.enum";
import { AppError } from "../../../core/error/app-error";
import { UserRepo, UserRepoFindByIdInput } from "../../domain/aggregate/user/user.repository";
import { User, UserRaw } from "../../domain/aggregate/user/user.root";
import { PostgresAdapter } from "../database/postgres/postgres.adapter";

interface Props {
  sql: PostgresAdapter
}

export class UserDatabaseRepo extends Repo implements UserRepo {
  readonly #sql: PostgresAdapter

  constructor(props: Props) {
    super()
    this.#sql = props.sql
  }

  async save(user: User): Promise<EitherResult<UserRaw>> {
    const raw = user.raw
    const keys = Object.keys(raw)

    const query = await this.#sql.query({
      query: `
        INSERT INTO users
        (${keys.join(', ')})
        VALUES (${Array.from({ length: keys.length }, (_, i) => `$${i + 1}`).join(', ')})
        ON CONFLICT (id) DO UPDATE SET
        ${Object.keys(raw).map((key) => `${key} = EXCLUDED.${key}`).join(', ')};
      `,
      values: Object.values(raw),
    })
    
    if (query.isLeft()) return this.either.left(query.value)

    return this.either.right(user.raw)
  }

  async findById(input: UserRepoFindByIdInput): Promise<EitherResult<User>> {
    const query = await this.#sql.query<UserRaw>({
      query: `SELECT * FROM users WHERE user_id = $1;`,
      values: [input.user_id],
    })
    if (query.isLeft()) return this.either.left(query.value)
    if (query.value.rowCount === 0) return this.either.left(new UserNotFoundError())

    return this.either.right(User.restore(query.value.rows[0]))
  }

  async delete(id: string): Promise<EitherResult<void>> {
    const query = await this.#sql.query({
      query: `DELETE FROM users WHERE user_id = $1;`,
      values: [id],
    })
    if (query.isLeft()) return this.either.left(query.value)

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
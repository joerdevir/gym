import { EitherResult } from "../../../../core/either";
import { User, UserRaw } from "./user.root";

export interface UserRepoSaveInput {
  user: User
  tenant_id: string
}
export interface UserRepoFindByIdInput {
  user_id: string
  tenant_id: string
}

export interface UserRepo {
  save(user: User): Promise<EitherResult<UserRaw>>
  findById(input: UserRepoFindByIdInput): Promise<EitherResult<User>>
  delete(id: string): Promise<EitherResult<void>>
}
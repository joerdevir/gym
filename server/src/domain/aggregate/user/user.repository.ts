import { EitherResult } from "../../../../core/either";
import { User, UserRaw } from "./user.root";

export interface UserRepo {
  save(user: User): Promise<EitherResult<UserRaw>>
  findById(id: string): Promise<EitherResult<UserRaw>>
  delete(id: string): Promise<EitherResult<void>>
}
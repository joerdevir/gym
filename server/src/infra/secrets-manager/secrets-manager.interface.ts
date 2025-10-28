import { EitherResult } from "../../../core/either";

export interface SecretsManager {
  getSecretValue<T = any>(secretId: string): Promise<EitherResult<T>>
}
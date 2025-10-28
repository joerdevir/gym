import { GetSecretValueCommand, SecretsManagerClient } from '@aws-sdk/client-secrets-manager';
import { EitherResult } from "../../../core/either"
import { InfraService } from "../../../core/infra/infra-service"
import { SecretsManager } from "./secrets-manager.interface"
import { AppError } from '../../../core/error/app-error';
import { HttpStatusCode } from '../../../core/enum/http-status-code.enum';

export class AwsSecretsManager extends InfraService implements SecretsManager {
  readonly #client = new SecretsManagerClient({ region: 'us-east-1' })

  async getSecretValue<T = any>(secretId: string): Promise<EitherResult<T>> {
    try {
      const command = new GetSecretValueCommand({ SecretId: secretId })
      const response = await this.#client.send(command)
      if (!response.SecretString) return this.either.left(new SecretsManagerClientError('Secret not found'))
      return this.either.right(JSON.parse(response.SecretString))
    } catch (error: any) {
      return this.either.left(new SecretsManagerClientError(error))
    }
  }
}

class SecretsManagerClientError extends AppError {
  constructor(error: any) {
    super({
      message: 'Failed to retrieve secret value',
      status: HttpStatusCode.INTERNAL_SERVER_ERROR,
      originError: error
    })
  }
}
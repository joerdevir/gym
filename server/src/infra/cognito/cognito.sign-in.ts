import { CognitoIdentityProviderClient, InitiateAuthCommand, InitiateAuthCommandInput, InitiateAuthCommandOutput } from "@aws-sdk/client-cognito-identity-provider";
import { InfraService } from "../../../core/infra/infra-service";
import { EitherResult } from "../../../core/either";
import { AppError } from "../../../core/error/app-error";

interface Props {
  cognito: CognitoIdentityProviderClient
}

export class CognitoSignIn extends InfraService {
  #cognito: CognitoIdentityProviderClient

  constructor(props: Props) {
    super()
    this.#cognito = props.cognito
  }

  async execute(input: InitiateAuthCommandInput): Promise<EitherResult<InitiateAuthCommandOutput>> {
    try {
      const command = new InitiateAuthCommand(input)
      const output = await this.#cognito.send(command)
      return this.either.right(output)
    } catch (error) {
      console.error('CognitoSignInError', { error })
      return this.either.left(new CognitoSignInError(error))
    }
  }
}

class CognitoSignInError extends AppError {
  constructor(error: any) {
    super({
      message: 'Error signing in with cognito',
      status: 500,
      originError: error
    })
  }
}


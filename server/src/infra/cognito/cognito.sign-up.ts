import { CognitoIdentityProviderClient, SignUpCommand, SignUpCommandInput, SignUpCommandOutput } from "@aws-sdk/client-cognito-identity-provider";
import { InfraService } from "../../../core/infra/infra-service";
import { EitherResult } from "../../../core/either";
import { AppError } from "../../../core/error/app-error";

interface Props {
  cognito: CognitoIdentityProviderClient
}

export class CognitoSignUp extends InfraService {
  #cognito: CognitoIdentityProviderClient

  constructor(props: Props) {
    super()
    this.#cognito = props.cognito
  }

  async execute(input: SignUpCommandInput): Promise<EitherResult<SignUpCommandOutput>> {
    try {
      const command = new SignUpCommand(input)
      const output = await this.#cognito.send(command)
      return this.either.right(output)
    } catch (error) {
      console.error('CognitoSignUpError', { error })
      return this.either.left(new CognitoSignUpError(error))
    }
  }
}

class CognitoSignUpError extends AppError {
  constructor(error: any) {
    super({
      message: 'Error signing up with cognito',
      status: 500,
      originError: error
    })
  }
}
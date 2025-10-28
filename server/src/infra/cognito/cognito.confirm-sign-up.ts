import { CognitoIdentityProviderClient, ConfirmSignUpCommand, ConfirmSignUpCommandInput, ConfirmSignUpCommandOutput } from "@aws-sdk/client-cognito-identity-provider";
import { InfraService } from "../../../core/infra/infra-service";
import { EitherResult } from "../../../core/either";
import { AppError } from "../../../core/error/app-error";

interface Props {
  cognito: CognitoIdentityProviderClient
}

export class CognitoConfirmSignUp extends InfraService {
  #cognito: CognitoIdentityProviderClient

  constructor(props: Props) {
    super()
    this.#cognito = props.cognito
  }

  async execute(input: ConfirmSignUpCommandInput): Promise<EitherResult<ConfirmSignUpCommandOutput>> {
    try {
      const command = new ConfirmSignUpCommand(input)
      const output = await this.#cognito.send(command)
      return this.either.right(output)
    } catch (error) {
      console.error('CognitoConfirmSignUpError', { error })
      return this.either.left(new CognitoConfirmSignUpError(error))
    }
  }
}

class CognitoConfirmSignUpError extends AppError {
  constructor(error: any) {
    super({
      message: 'Error confirming sign up with cognito',
      status: 500,
      originError: error
    })
  }
}


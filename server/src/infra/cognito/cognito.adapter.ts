import { CognitoIdentityProviderClient, SignUpCommand, SignUpCommandInput, SignUpCommandOutput, ConfirmSignUpCommand, ConfirmSignUpCommandInput, ConfirmSignUpCommandOutput } from "@aws-sdk/client-cognito-identity-provider";
import { Component } from "../../../core/component";
import { env } from "../config/env";
import { EitherResult } from "../../../core/either";
import { AppError } from "../../../core/error/app-error";

export class CognitoAdapter extends Component {
  readonly #client: CognitoIdentityProviderClient

  constructor() {
    super()
    this.#client = new CognitoIdentityProviderClient({
      region: env.AWS_REGION,
    })
  }

  async signUp(input: SignUpCommandInput): Promise<EitherResult<SignUpCommandOutput>> {
    try {
      const command = new SignUpCommand(input)
      const output = await this.#client.send(command)
      return this.either.right(output)
    } catch (error) {
      console.error('CognitoSignUpError', { error })
      return this.either.left(new CognitoSignUpError(error))
    }
  }

  async confirmSignUp(input: ConfirmSignUpCommandInput): Promise<EitherResult<ConfirmSignUpCommandOutput>> {
    try {
      const command = new ConfirmSignUpCommand(input)
      const output = await this.#client.send(command)
      return this.either.right(output)
    } catch (error) {
      console.error('CognitoConfirmSignUpError', { error })
      return this.either.left(new CognitoConfirmSignUpError(error))
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

class CognitoConfirmSignUpError extends AppError {
  constructor(error: any) {
    super({
      message: 'Error confirming sign up with cognito',
      status: 500,
      originError: error
    })
  }
}
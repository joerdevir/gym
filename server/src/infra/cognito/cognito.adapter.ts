import { CognitoIdentityProviderClient, SignUpCommand, SignUpCommandInput, SignUpCommandOutput } from "@aws-sdk/client-cognito-identity-provider";
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
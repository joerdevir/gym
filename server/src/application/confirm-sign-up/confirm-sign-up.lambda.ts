
import { APIGatewayProxyEvent } from 'aws-lambda'
import { CognitoIdentityProviderClient } from '@aws-sdk/client-cognito-identity-provider'
import { CognitoConfirmSignUp } from '../../infra/cognito/cognito.confirm-sign-up'
import { ConfirmSignUpUsecase } from './confirm-sign-up.usecase'
import { env } from '../../infra/config/env'

const cognitoClient = new CognitoIdentityProviderClient({ region: env.AWS_REGION })
const cognito = new CognitoConfirmSignUp({ cognito: cognitoClient })
const confirmSignUp = new ConfirmSignUpUsecase({ cognito })

export const handler = async (event: APIGatewayProxyEvent) => {
  console.log('ConfirmSignUpLambda', { event: JSON.stringify(event, null, 2) })

  const body = JSON.parse(event.body || '{}') as {
    email: string
    confirmation_code: string
  }

  const result = await confirmSignUp.execute({
    email: body?.email,
    confirmation_code: body?.confirmation_code,
  })
  if (result.isLeft()) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: result.value.message })
    }
  }

  return {
    statusCode: 200,
  }
}
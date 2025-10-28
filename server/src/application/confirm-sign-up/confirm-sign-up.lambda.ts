
import { APIGatewayProxyEvent } from 'aws-lambda'
import { CognitoAdapter } from '../../infra/cognito/cognito.adapter'
import { ConfirmSignUpUsecase } from './confirm-sign-up.usecase'

const cognito = new CognitoAdapter()
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
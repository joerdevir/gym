import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb'
import { DynamoDB } from '@aws-sdk/client-dynamodb'
import { CognitoIdentityProviderClient } from '@aws-sdk/client-cognito-identity-provider'
import { APIGatewayProxyEvent } from 'aws-lambda'
import { SelfSignUpUsecase } from './self-sign-up.usecase'
import { CognitoSignUp } from '../../infra/cognito/cognito.sign-up'
import { DynamoAdapter } from '../../infra/database/dynamo/dynamo.adapter'
import { env } from '../../infra/config/env'
  
const dynamoClient = new DynamoDB({ region: env.AWS_REGION })
const dynamoDBDocumentClient = DynamoDBDocumentClient.from(dynamoClient)
const dynamo = new DynamoAdapter({ dynamoDBDocumentClient })

const cognitoClient = new CognitoIdentityProviderClient({ region: env.AWS_REGION })
const cognito = new CognitoSignUp({ cognito: cognitoClient })

const signUp = new SelfSignUpUsecase({ cognitoSignUp: cognito })

export const handler = async (event: APIGatewayProxyEvent) => {
  console.log('SignUpLambda', { event: JSON.stringify(event, null, 2) })

  const body = JSON.parse(event.body || '{}') as {
    full_name: string
    email: string
    phone: string
    password: string
  }

  const result = await signUp.execute({
    full_name: body?.full_name,
    email: body?.email,
    phone: body?.phone,
    password: body?.password,
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
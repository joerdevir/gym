import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb'
import { DynamoDB } from '@aws-sdk/client-dynamodb'
import { CognitoIdentityProviderClient } from '@aws-sdk/client-cognito-identity-provider'
import { APIGatewayProxyEvent } from 'aws-lambda'
import { SelfSignUpUsecase } from './self-sign-up.usecase'
import { CognitoSignUp } from '../../infra/cognito/cognito.sign-up'
import { DynamoAdapter } from '../../infra/database/dynamo/dynamo.adapter'
import { env } from '../../infra/config/env'
import { makeHandler } from '../../infra/handler/middy.handler'
  
const dynamoClient = new DynamoDB({ region: env.AWS_REGION })
const dynamoDBDocumentClient = DynamoDBDocumentClient.from(dynamoClient)
const dynamo = new DynamoAdapter({ dynamoDBDocumentClient })

const cognitoClient = new CognitoIdentityProviderClient({ region: env.AWS_REGION })
const cognito = new CognitoSignUp({ cognito: cognitoClient })

const signUp = new SelfSignUpUsecase({ cognitoSignUp: cognito })

export const handler = makeHandler(async (event) => {
  const result = await signUp.execute({
    full_name: event.body?.full_name,
    email: event.body?.email,
    phone: event.body?.phone,
    password: event.body?.password,
  })
  if (result.isLeft()) {
    return {
      statusCode: result.value.status,
      body: { message: result.value.message },
    }
  }

  return {
    statusCode: 200,
    body: { message: 'User signed up successfully' },
  }
})
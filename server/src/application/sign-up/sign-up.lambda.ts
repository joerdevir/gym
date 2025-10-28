import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb'
import { DynamoDB } from '@aws-sdk/client-dynamodb'
import { APIGatewayProxyEvent } from 'aws-lambda'
import { SignUpUsecase } from './sign-up.usecase'
import { PostgresAdapter } from '../../infra/database/postgres/postgres.adapter'
import { CognitoAdapter } from '../../infra/cognito/cognito.adapter'
import { UserDatabaseRepo } from '../../infra/repository/user.database.repo'
import { DynamoAdapter } from '../../infra/database/dynamo/dynamo.adapter'
import { env } from '../../infra/config/env'
  
const dynamoClient = new DynamoDB({ region: env.AWS_REGION })
const dynamoDBDocumentClient = DynamoDBDocumentClient.from(dynamoClient)
const dynamo = new DynamoAdapter({ dynamoDBDocumentClient })

const postgres = new PostgresAdapter()
const cognito = new CognitoAdapter()
const userRepo = new UserDatabaseRepo({ dynamo })

const signUp = new SignUpUsecase({
  userRepo,
  postgres,
  cognito,
})

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
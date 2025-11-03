import { CognitoIdentityProviderClient } from "@aws-sdk/client-cognito-identity-provider"
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify"
import { SelfSignUpUsecase } from "./self-sign-up.usecase"
import { CognitoSignUp } from "../../infra/cognito/cognito.sign-up"
import { env } from "../../infra/config/env"

const cognitoClient = new CognitoIdentityProviderClient({ region: env.AWS_REGION })
const cognitoSignUp = new CognitoSignUp({ cognito: cognitoClient })
const selfSignUp = new SelfSignUpUsecase({ cognitoSignUp })

interface RequestBody {
  full_name: string
  email: string
  phone: string
  password: string
}

export class SelfSignUpRoute {
  static register(fastify: FastifyInstance) {
    fastify.post('/auth/self-sign-up', SelfSignUpRoute.handler)
  }

  static async handler(request: FastifyRequest<{ Body: RequestBody }>, reply: FastifyReply) {
    const result = await selfSignUp.execute({
      full_name: request.body.full_name,
      email: request.body.email,
      phone: request.body.phone,
      password: request.body.password,
    })
    if (result.isLeft()) return reply.status(result.value.status).send({ message: result.value.message })

    return reply.status(200).send({ message: 'User signed up successfully' })
  }
}
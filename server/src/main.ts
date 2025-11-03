import Fastify from 'fastify';
import { SelfSignUpRoute } from './application/self-sign-up/self-sign-up.route';

const fastify = Fastify()

SelfSignUpRoute.register(fastify)

fastify.setErrorHandler((error, request, reply) => {
  console.error(error)
  reply.status(500).send({ message: 'Internal server error' })
})

fastify
.listen({ port: 3001 })
.then(() => {
  console.log('Server is running on https://localhost:3001')
})
.catch((err) => {
  console.error(err)
  process.exit(1)
})
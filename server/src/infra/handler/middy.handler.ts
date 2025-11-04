import middy from '@middy/core'
import httpJsonBodyParser from '@middy/http-json-body-parser'
import httpResponseSerializer from '@middy/http-response-serializer'
import { HandlerRequest, HandlerResponse } from './middy-handler-types'

type Handler<TBody extends Record<string, any>> = (event: HandlerRequest<TBody>) => Promise<HandlerResponse>

export const makeHandler = (handler: any) => {
  return middy()
    .use(httpJsonBodyParser({ disableContentTypeError: true }))
    .use(httpResponseSerializer({
      defaultContentType: 'application/json',
      serializers: [
        {
          regex: /^application\/json$/,
          serializer: ({ body }) => JSON.stringify(body),
        },
      ],
    }))
    .handler(handler)
}
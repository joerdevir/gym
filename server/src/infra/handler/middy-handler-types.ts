export interface HandlerRequest<TBody extends Record<string, any>> {
  body?: TBody
}

export interface HandlerResponse {
  statusCode: number
  body?: Record<string, any>
  headers?: Record<string, string>
}
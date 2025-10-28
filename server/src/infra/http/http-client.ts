import {AxiosRequestConfig} from "axios"
import {EitherResult} from "../../../core/either"

export interface HttpClient<HttpRequestOptions = AxiosRequestConfig> {
  get<T = any>(url: string, options?: HttpRequestOptions): Promise<EitherResult<T>>
  post<T = any>(url: string, body: any, options?: HttpRequestOptions): Promise<EitherResult<T>>
  put<T = any>(url: string, body: any, options?: HttpRequestOptions): Promise<EitherResult<T>>
}

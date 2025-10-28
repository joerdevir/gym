import axios, {AxiosRequestConfig} from "axios";
import {HttpClient} from "./http-client";
import {EitherResult} from "../../../core/either";
import {Component} from "../../../core/component";
import {AppError} from "../../../core/error/app-error";

export class AxiosHttpClient extends Component implements HttpClient<AxiosRequestConfig>  {

  async get<T = any>(url: string, options?: AxiosRequestConfig): Promise<EitherResult<T>> {
    try {
      const response = await axios.get(url, options)
      return this.either.right(response.data)
    } catch (error) {
      console.error('[HttpClientError]', JSON.stringify(error, null, 2))
      return this.either.left(new AxiosHttpClientError(error))
    }
  }

  async post<T = any>(url: string, body: any, options?: AxiosRequestConfig): Promise<EitherResult<T>> {
    try {
      const response = await axios.post(url, body, options)
      return this.either.right(response.data)
    } catch (error) {
      console.error('[HttpClientError]', JSON.stringify(error, null, 2))
      return this.either.left(new AxiosHttpClientError(error))
    }
  }

  async put<T = any>(url: string, body: any, options?: AxiosRequestConfig): Promise<EitherResult<T>> {
    try {
      const response = await axios.put(url, body, options)
      return this.either.right(response.data)
    } catch (error) {
      console.error('[HttpClientError]', JSON.stringify(error, null, 2))
      return this.either.left(new AxiosHttpClientError(error))
    }
  }
}

class AxiosHttpClientError extends AppError {
  constructor(error: any) {
    super({
      message: 'Something went wrong',
      status: error?.response?.status ?? 500,
      originError: error
    })
  }
}
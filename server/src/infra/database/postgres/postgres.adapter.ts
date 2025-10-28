import { Client, QueryResult, QueryResultRow } from "pg";
import { Component } from "../../../../core/component";
import { EitherResult } from '../../../../core/either';
import { AppError } from '../../../../core/error/app-error';
import { env } from "../../config/env";
import { Environment } from "../../../../core/enum/env.enum";

export interface PostgresAdapterInput { query: string; values?: any[] }

export class PostgresAdapter extends Component {
  readonly #pgClient: Client

  constructor() {
    super();
    this.#pgClient = new Client({
      host: env.POSTGRES_HOST,
      port: env.POSTGRES_PORT,
      user: env.POSTGRES_USER,
      password: env.POSTGRES_PASSWORD,
      database: env.POSTGRES_DB,
      ssl: env.NODE_ENV === Environment.TEST ? false : true
    })
  }

  async connect(): Promise<EitherResult<void>> {
    try {
      await this.#pgClient.connect()
      return this.either.right(undefined)
    } catch (error) {
      console.error('PostgresConnectError', { error })
      return this.either.left(new PostgresConnectError(error))
    }
  }

  async disconnect(): Promise<EitherResult<void>> {
    try {
      await this.#pgClient.end()
      return this.either.right(undefined)
    } catch (error) {
      console.error('PostgresDisconnectError', { error })
      return this.either.left(new PostgresDisconnectError(error))
    }
  }

  async query<T extends QueryResultRow = any>(input: PostgresAdapterInput): Promise<EitherResult<QueryResult<T>>> {
    try {
      const result = await this.#pgClient.query(input.query, input.values)
      return this.either.right(result)
    } catch (error) {
      console.error('PostgresQueryError', { error, query: input.query, values: input.values })
      return this.either.left(new PostgresQueryError(error))
    }
  }
}

class PostgresConnectError extends AppError {
  constructor(error: any) {
    super({
      message: 'Error connecting to postgres',
      status: 500,
      originError: error
    })
  }
}

class PostgresDisconnectError extends AppError {
  constructor(error: any) {
    super({
      message: 'Error disconnecting from postgres',
      status: 500,
      originError: error
    })
  }
}

class PostgresQueryError extends AppError {
  constructor(error: any) {
    super({
      message: 'Error querying data from postgres',
      status: 500,
      originError: error
    })
  }
} 
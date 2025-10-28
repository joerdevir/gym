import { DeleteCommand, DeleteCommandInput, DeleteCommandOutput, DynamoDBDocumentClient, GetCommand, GetCommandInput, GetCommandOutput, PutCommand, PutCommandInput, PutCommandOutput, QueryCommand, QueryCommandInput, QueryCommandOutput, TransactWriteCommand, TransactWriteCommandInput, TransactWriteCommandOutput, UpdateCommand, UpdateCommandInput, UpdateCommandOutput } from "@aws-sdk/lib-dynamodb";
import { Component } from "../../../../core/component";
import { EitherResult } from "../../../../core/either";
import { AppError } from "../../../../core/error/app-error";
import { HttpStatusCode } from "../../../../core/enum/http-status-code.enum";

type Props = {
  dynamoDBDocumentClient: DynamoDBDocumentClient
}

export class DynamoAdapter extends Component {
  readonly #client: DynamoDBDocumentClient;

  constructor(props: Props) {
    super()
    this.#client = props.dynamoDBDocumentClient
  }

  async query (input: QueryCommandInput): Promise<EitherResult<QueryCommandOutput>> {
    try {
      const command = new QueryCommand(input)
      const output = await this.#client.send(command)
      return this.either.right(output)
    } catch (error) {
      console.error('DynamoDB.Query.Error', error)
      return this.either.left(new AppError({
        message: 'Error querying data from dynamodb',
        status: HttpStatusCode.INTERNAL_SERVER_ERROR
      }))
    }
  }

  async get(input: GetCommandInput): Promise<EitherResult<GetCommandOutput>> {
    try {
      const output = await this.#client.send(new GetCommand(input))
      return this.either.right(output)
    } catch (error) {
      console.error('DynamoDB.Get.Error', error)
      return this.either.left(new AppError({
        message: `Error getting data from dynamodb`,
        status: HttpStatusCode.INTERNAL_SERVER_ERROR,
      }))
    }
  }

  async put(input: PutCommandInput): Promise<EitherResult<PutCommandOutput>> {
    try {
      const output = await this.#client.send(new PutCommand(input))
      return this.either.right(output)
    } catch (error) {
      console.error('DynamoDB.Put.Error', error)
      return this.either.left(new AppError({
        message: `Error putting data to dynamodb`,
        status: HttpStatusCode.INTERNAL_SERVER_ERROR,
      }))
    }
  }

  async update(input: UpdateCommandInput): Promise<EitherResult<UpdateCommandOutput>> {
    try {
      const output = await this.#client.send(new UpdateCommand(input))
      return this.either.right(output)
    } catch (error) {
      console.error('DynamoDB.Update.Error', error)
      return this.either.left(new AppError({
        message: `Error updating data in dynamodb`,
        status: HttpStatusCode.INTERNAL_SERVER_ERROR,
      }))
    }
  }

  async delete(input: DeleteCommandInput): Promise<EitherResult<DeleteCommandOutput>> {
    try {
      const output = await this.#client.send(new DeleteCommand(input))
      return this.either.right(output)
    } catch (error) {
      console.error('DynamoDB.Delete.Error', error)
      return this.either.left(new AppError({
        message: `Error deleting data from dynamodb`,
        status: HttpStatusCode.INTERNAL_SERVER_ERROR,
      }))
    }
  }

  async transactWrite (input: TransactWriteCommandInput): Promise<EitherResult<TransactWriteCommandOutput>> {
    try {
      const command = new TransactWriteCommand(input)
      const output = await this.#client.send(command)
      return this.either.right(output)
    } catch (error) {
      console.log('DynamoDB.TransactWrite.Error', error)
      return this.either.left(new AppError({
        message: 'Error transacting data in dynamodb',
        status: HttpStatusCode.INTERNAL_SERVER_ERROR
      }))
    }
  }
}

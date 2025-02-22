import {APIGatewayProxyEventBase, APIGatewayProxyResult, Context} from "aws-lambda";

export const handler = async (event: APIGatewayProxyEventBase<any>, context: Context): Promise<APIGatewayProxyResult> => {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Olá do AWS Lambda!" }),
  }
}
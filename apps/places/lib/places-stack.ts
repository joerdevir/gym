import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as path from 'path';
import { Construct } from 'constructs';
import { execSync } from 'child_process';

const branch = execSync('git rev-parse --abbrev-ref HEAD').toString().trim()
export class PlacesStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    new cdk.aws_sqs.Queue(this, `PlacesQueue-${branch}`, {
      visibilityTimeout: cdk.Duration.seconds(300)
    })

    const tenantTable = new cdk.aws_dynamodb.Table(this, `tenant-${branch}`, {
      tableName: `tenant-${branch}`,
      partitionKey: { name: 'pk', type: cdk.aws_dynamodb.AttributeType.STRING },
      sortKey: { name: 'sk', type: cdk.aws_dynamodb.AttributeType.STRING },
      billingMode: cdk.aws_dynamodb.BillingMode.PAY_PER_REQUEST,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    })

    const tenantDynamoDBReadPolicy = new cdk.aws_iam.PolicyStatement({
      actions: ['dynamodb:GetItem','dynamodb:Query'],
      resources: [tenantTable.tableArn],
    })

    const placesApi = new cdk.aws_apigateway.RestApi(this, `places-api`, { 
      restApiName: `PlacesApi`,
      description: `API Gateway Places`,
      deployOptions: {
        stageName: branch.toLowerCase(),
      },
      defaultCorsPreflightOptions: {
        allowOrigins: cdk.aws_apigateway.Cors.ALL_ORIGINS,
        allowMethods: cdk.aws_apigateway.Cors.ALL_METHODS,
      },
    })

    const lambda01 = new cdk.aws_lambda_nodejs.NodejsFunction(this, `Get-Users-${branch}`, {
      runtime: lambda.Runtime.NODEJS_18_X,
      entry: path.join(__dirname, '../lambda/users/get-users.ts'),
      handler: 'handler',
      bundling: {
        minify: true,
        sourceMap: false,
        externalModules: ['aws-sdk'],
      }
    })
    lambda01.addToRolePolicy(tenantDynamoDBReadPolicy)

    const users_endpoint = placesApi.root.addResource('users')
    users_endpoint.addMethod('GET', new cdk.aws_apigateway.LambdaIntegration(lambda01), { authorizationType: cdk.aws_apigateway.AuthorizationType.NONE })
    users_endpoint.addMethod('POST', new cdk.aws_apigateway.LambdaIntegration(lambda01), { authorizationType: cdk.aws_apigateway.AuthorizationType.NONE })
  }
}

#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { execSync } from 'child_process';
import { PlacesStack } from '../lib/places-stack';

const branch = execSync('git rev-parse --abbrev-ref HEAD').toString().trim()
console.log(`🚀 Deploying branch: ${branch}`)

const app = new cdk.App()

switch (branch) {
  case 'main':
    new PlacesStack(app, 'PlacesStack', {
      env: {
        account: process.env.CDK_DEFAULT_ACCOUNT,
        region: process.env.CDK_DEFAULT_REGION
      },
    })
    break
  case 'dev':
    new PlacesStack(app, 'PlacesStackDev', {
      env: {
        account: process.env.CDK_DEFAULT_ACCOUNT,
        region: process.env.CDK_DEFAULT_REGION
      },
    })
    break
  default:
    new PlacesStack(app, `PlacesStack-${branch}`, {
      env: {
        account: process.env.CDK_DEFAULT_ACCOUNT ?? '970547344542',
        region: process.env.CDK_DEFAULT_REGION ?? 'sa-east-1'
      },
    })
    break
}

/* For more information, see https://docs.aws.amazon.com/cdk/latest/guide/environments.html */
#!/usr/bin/env node
import { App } from 'aws-cdk-lib'

import { ServiceStack } from './service-stack'

const app = new App()


new ServiceStack(app, 'vietaws-swag-store', {
    env: {
        account: process.env.CDK_DEFAULT_ACCOUNT,
        region: process.env.CDK_DEFAULT_REGION || 'ap-southeast-1'
    }
})


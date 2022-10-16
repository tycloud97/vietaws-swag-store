import * as s3 from 'aws-cdk-lib/aws-s3';
import * as s3Deploy from 'aws-cdk-lib/aws-s3-deployment';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as acm from 'aws-cdk-lib/aws-certificatemanager';
import * as route53Targets from 'aws-cdk-lib/aws-route53-targets';
import * as cloudfrontOrigins from 'aws-cdk-lib/aws-cloudfront-origins';

import * as route53 from 'aws-cdk-lib/aws-route53';
import { Construct } from 'constructs'
import * as cdk from 'aws-cdk-lib';

import { getConfig } from './config'

export class ServiceStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: cdk.StackProps) {
    super(scope, id, props)

    const config = getConfig(this)

    const zone = route53.HostedZone.fromLookup(this, 'Zone', {
      domainName: config.domain
    })

    const bucket = new s3.Bucket(this, 'Bucket', {
      bucketName: 'vietaws-swag-store',
      websiteIndexDocument: 'index.html',
      publicReadAccess: true,
      cors: [
        {
          maxAge: 3000,
          allowedOrigins: ['*'],
          allowedHeaders: ['*'],
          allowedMethods: [s3.HttpMethods.GET, s3.HttpMethods.HEAD]
        }
      ]
    })

    const certificate = new acm.DnsValidatedCertificate(
      this,
      'Certificate',
      {
        domainName: config.domain,
        hostedZone: zone,
        region: 'us-east-1'
      }
    )

    const cachePolicy = new cloudfront.CachePolicy(
      this,
      'CachePolicy',
      {
        enableAcceptEncodingBrotli: true,
        enableAcceptEncodingGzip: true,
        queryStringBehavior: cloudfront.CacheQueryStringBehavior.all(),
        cookieBehavior: cloudfront.CacheCookieBehavior.none(),
        headerBehavior: cloudfront.CacheHeaderBehavior.allowList('Origin')
      }
    )

    const distribution = new cloudfront.Distribution(this, 'Distribution', {
      domainNames: [config.domain],
      certificate: certificate,
      defaultBehavior: {
        origin: new cloudfrontOrigins.S3Origin(bucket),
        cachePolicy: cachePolicy
      },
      errorResponses: [
        {
          httpStatus: 404,
          responseHttpStatus: 200,
          responsePagePath: '/index.html'
        }
      ]
    })

    const cfnDistribution = distribution.node
      .defaultChild as cloudfront.CfnDistribution
    cfnDistribution.overrideLogicalId('DistributionCFDistributionXXXXXXXX')

    new route53.ARecord(this, 'ARecordTop', {
      recordName: config.domain,
      target: route53.RecordTarget.fromAlias(
        new route53Targets.CloudFrontTarget(distribution)
      ),
      zone
    })

    new s3Deploy.BucketDeployment(this, 'BucketDeployment', {
      sources: [s3Deploy.Source.asset('../build')],
      distribution: distribution,
      distributionPaths: ['/*'],
      destinationBucket: bucket,
    })
  }
}

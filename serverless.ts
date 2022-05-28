import type { AWS } from "@serverless/typescript";

import birthday from "@functions/birthday";

const serverlessConfiguration: AWS = {
  service: "birthday-schedule",
  frameworkVersion: "3",
  useDotenv: true,
  plugins: [
    "serverless-esbuild",
    "serverless-offline",
    "serverless-local-schedule",
    "serverless-deployment-bucket",
  ],
  provider: {
    name: "aws",
    region: "us-east-1",
    deploymentBucket: {
      name: "lambda-${self:service}-${self:provider.stage, 'dev'}",
      serverSideEncryption: "AES256",
    },
    runtime: "nodejs14.x",
    stage: "${opt:stage, 'dev'}",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
    },
  },
  // import the function via paths
  functions: { birthday },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ["aws-sdk"],
      target: "node14",
      define: { "require.resolve": undefined },
      platform: "node",
      concurrency: 10,
    },
    webhooks: {
      discord: { baseUrl: "https://discord.com/api/webhooks" },
    },
  },
};

module.exports = serverlessConfiguration;

'user strict';

const DynamoDB = require('aws-sdk').DynamoDB;

const dynamoConfig = {
  sessionToken: process.env.AWS_SESSION_TOKEN,
  region: process.env.SERVERLESS_REGION,
};

if (process.env.IS_OFFLINE) {
  dynamoConfig.endpoint = process.env.LOCAL_DDB_ENDPOINT;
}

const client = new DynamoDB.DocumentClient(dynamoConfig);

module.exports = (method, params) =>
  Promise.fromCallback(cb => client[method](params, cb));
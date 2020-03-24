const aws = require('aws-sdk');

const dynamoDB = new aws.DynamoDB({
  apiVersion: '2012-08-10',
  endpoint: 'http://localhost:8080',
  region: 'us-west-2',
});

dynamoDB
  .createTable({
    AttributeDefinitions: [{ AttributeName: 'id', AttributeType: 'S' }],
    TableName: 'pricing-engine-dev',
    KeySchema: [{ AttributeName: 'id', KeyType: 'HASH' }],
    ProvisionedThroughput: {
      ReadCapacityUnits: 5,
      WriteCapacityUnits: 5,
    },
  })
  .promise()
  .then(() => console.log('success'))
  .catch(err => console.error(err));

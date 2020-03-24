const { Client } = require('elasticsearch');
const { DynamoDB } = require('aws-sdk');
const _ = require('lodash');

const esClient = new Client({
  host: `https://erika.o'neal:l8ilODlsWGa3@esauthprod.vivintsolar.com:443`,
});
const index = 'employee_current_index';
const type = 'employee_current';
function buildQuery(badgeIds) {
  return {
    _source: ['business_title', 'full_name', 'badge_id'],
    filter: {
      bool: {
        must: [{ terms: { badge_id: badgeIds } }],
      },
    },
  };
}

const dynamo = new DynamoDB({
  region: 'us-west-2',
  endpoint: 'https://dynamodb.us-west-2.amazonaws.com',
});
const docClient = new DynamoDB.DocumentClient({ service: dynamo });
const table = 'creditService-limit-prod';

async function run() {
  try {
    const dynamoResponse = await docClient
      .scan({
        TableName: table,
        FilterExpression: 'attribute_not_exists(expires)',
      })
      .promise();
    const limits = dynamoResponse.Items;
    console.log('limits missing expiration', limits.length);

    const esResponse = await esClient.search({
      body: buildQuery(_.map(limits, 'badgeId')),
      index,
      type,
      size: 10000,
    });
    const employees = _.map(esResponse.hits.hits, '_source');

    console.log('employees missing expiration', employees.length);

    console.log(employees);
  } catch (err) {
    console.error(err);
  }
}

run();

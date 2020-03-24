const { Client } = require('elasticsearch');
const _ = require('lodash');
const zipPeeps = require('./zip-peeps-new');

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

async function run() {
  const badgeIds = [...new Set(_.flatten(Object.values(zipPeeps)))];

  console.log(badgeIds.length);

  const esResponse = await esClient.search({
    index,
    type,
    size: badgeIds.length * 2,
    body: buildQuery(badgeIds),
  });
  const employees = _.map(esResponse.hits.hits, '_source');

  console.log(employees.length);
}

run();

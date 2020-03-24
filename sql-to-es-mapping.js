#!/usr/bin/env node

const program = require('commander');
const client = require('snowflake-sdk');

const connect = async config => {
  try {
    const connection = client.createConnection({ account: 'vslr', ...config });
    const conn = await new Promise((resolve, reject) => {
      connection.connect((err, c) => (err ? reject(err) : resolve(c)));
    });
    console.log(`Snowflake successfully connected as id: ${conn.getId()}`);
    return conn;
  } catch (error) {
    console.error('Unable to create snowflake connection', error);
    throw error;
  }
};

const execute = async (client, params) => {
  try {
    const rows = await new Promise((resolve, reject) =>
      client.execute({
        ...params,
        complete: (err, _, rows) => (err ? reject(err) : resolve(rows)),
      }),
    );
    return rows;
  } catch (error) {
    console.error('Error during query', error);
    throw error;
  }
};

const formatColumns = (columns, excludes) =>
  columns
    .filter(c => !excludes.includes(c.column_name))
    .map(c => ({ name: c.column_name, typeInfo: JSON.parse(c.data_type) }));

const sqlToEsTypeMap = {
  TEXT: () => ({ type: 'string', index: 'not_analyzed' }),
  DATE: () => ({ type: 'date', format: 'date_optional_time' }),
  BOOLEAN: () => ({ type: 'boolean' }),
  FIXED: ({ scale }) => ({ type: scale > 0 ? 'float' : 'integer' }),
};

const mapSqlToEsType = typeInfo => sqlToEsTypeMap[typeInfo.type](typeInfo);

const transformToESMapping = definitions =>
  definitions.reduce(
    (acc, { name, typeInfo }) => ({ ...acc, [name]: mapSqlToEsType(typeInfo) }),
    {},
  );

const run = async ({ username, password, table, query, excludeColumns }) => {
  if (!table && !query) {
    throw new Error('must provide one of table or query');
  }
  const client = await connect({ username, password });
  const rows = await execute(client, {
    sqlText: query || `SHOW COLUMNS IN ${table}`,
  });
  const definitions = formatColumns(rows, excludeColumns);
  const mapping = transformToESMapping(definitions);

  return mapping;
};

const collect = (val, list) => [...list, val];

program
  .version('0.0.1', '-v, --version')
  .option('-u, --username <username>', 'Database user')
  .option('-p, --password <password>', 'Database password')
  .option('-t, --table [table]', 'Specify the table name.')
  .option(
    '-q, --query [query]',
    'Specify the query to run to get the columns. Overrides <table>',
  )
  .option(
    '-x, --exclude-columns [items]',
    'Column names to ignore. Can be repeated for multiple columns',
    collect,
    [],
  )
  .parse(process.argv);

run(program)
  .then(m => JSON.stringify(m, null, 2))
  .then(console.log)
  .catch(console.error);

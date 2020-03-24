const { ApolloServer, gql } = require('apollo-server-hapi');
const { Server } = require('hapi');
const { MongoClient } = require('mongodb');
const { generate } = require('shortid');
const uniqBy = require('lodash.uniqby');
const config = require('./env');

const app = new Server({
  port: config.port,
  host: config.host,
});

const typeDefs = gql`
  type Query {
    environment(app: String!, lane: String!): Environment
  }

  type Mutation {
    setEnvironment(input: SetEnvironmentInput): Environment
  }

  type Environment {
    app: String!
    lane: String!
    variables: [Variable]
  }

  type Variable {
    name: String!
    value: String!
  }

  input VariableInput {
    name: String!
    value: String!
  }

  input SetEnvironmentInput {
    app: String!
    lane: String!
    variables: [VariableInput]
  }
`;

const resolvers = {
  Query: {
    environment: async (source, args) => {
      const { app, lane } = args;
      const environment = await execute(async client => {
        const collection = await client.collection('environments');

        const all = await collection.find({}).toArray();

        console.log('all', all);

        return collection.findOne({ app, lane });
      });

      return environment;
    },
  },
  Mutation: {
    setEnvironment: async (source, args) => {
      const {
        input: { app, lane, variables },
      } = args;
      const results = await execute(async client => {
        const collection = await client.collection('environments');
        const currentDoc = await collection.findOne({
          app,
          lane,
        });

        console.log('currentDoc', currentDoc);

        if (currentDoc) {
          const newVariables = uniqBy(
            [...variables, ...(currentDoc.variables || [])],
            x => x.name,
          );

          await collection.findOneAndUpdate(
            { app, lane },
            { $set: { app, lane, variables: newVariables } },
          );
        } else {
          await collection.insertOne({
            _id: generate(),
            app,
            lane,
            variables: uniqBy(variables, 'name'),
          });
        }

        return collection.findOne({ app, lane });
      });

      return results;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

async function execute(fn) {
  const client = await MongoClient.connect(
    config.mongodb.uri,
    { useNewUrlParser: true },
  );
  const db = client.db(config.mongodb.database);
  const results = await fn(db);
  await client.close();
  return results;
}

async function bootstrap() {
  try {
    await server.applyMiddleware({ app, cors: true });
    await app.start();
    console.log(`Server started at ${app.info.uri}`);
  } catch (error) {
    console.error('Error while bootstrapping app', error);
  }
}

bootstrap();

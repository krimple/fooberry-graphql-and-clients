const { GraphQLServer, PubSub } = require('graphql-yoga');
const { typeDefs } = require('./schema');
const { resolvers } = require('./resolvers');
const { commands } = require('./commands');

const pubsub = new PubSub();
const server = new GraphQLServer({ typeDefs, resolvers, context: { pubsub }});
server.start({ tracing: true }, () => console.log(`Server is running on localhost:4000`));

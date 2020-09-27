import { GraphQLServer, PubSub } from 'graphql-yoga';

/* Custom modules requirement */
import db from './db';

import Query from './resolvers/query';
import Mutation from './resolvers/mutation';
import Subscription from './resolvers/subscription'

import User from './resolvers/user';
import Post from './resolvers/post';
import Comment from './resolvers/comment';
/*  */

/* Server options */
const opts = {
  port: 4000,
};
/*  */

const pubsub = new PubSub();

/* Configurating test server */
const server = new GraphQLServer({
  typeDefs: `${__dirname}/typeDefs.graphql`, // type definitions
  resolvers: {
    Query,
    Mutation,
    Subscription,
    User,
    Post,
    Comment,
  },
  context: {
    db,
    pubsub,
  },
});
/*  */

/* Starting server */
server.start(opts, () => {
  console.log(`Server started on localhost:${opts.port}`);
});
/*  */

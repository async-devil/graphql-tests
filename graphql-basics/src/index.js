import { GraphQLServer } from 'graphql-yoga';

/* Custom modules requirement */
import db from './db';
import Query from './resolvers/query';
import Mutation from './resolvers/mutation';
import User from './resolvers/user';
import Post from './resolvers/post';
import Comment from './resolvers/comment';
/*  */

/* Server options */
const opts = {
  port: 4003,
};
/*  */

/* Configurating test server */
const server = new GraphQLServer({
  typeDefs: `${__dirname}/typeDefs.graphql`, // type definitions
  resolvers: {
    Query,
    Mutation,
    User,
    Post,
    Comment,
  },
  context: {
    db,
  },
});
/*  */

/* Starting server */
server.start(opts, () => {
  console.log(`Server started on localhost:${opts.port}`);
});
/*  */

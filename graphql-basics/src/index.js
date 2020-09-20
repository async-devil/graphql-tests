import { GraphQLServer } from 'graphql-yoga';

/* Custom modules requirement */
import Query from './resolvers/query';
import Mutation from './resolvers/mutation';
import User from './resolvers/user';
import Post from './resolvers/post';
import Comment from './resolvers/comment';

const fs = require('fs');
/*  */

/* Server options */
const opts = {
  port: 4003,
};
/*  */

/* Test temporary database */
let users;
let posts;
let comments;
try {
  users = JSON.parse(fs.readFileSync(`${__dirname}/database/users.json`));
  // checking if file containing json, if not cathing error
} catch (err) {
  users = [];
}

try {
  posts = JSON.parse(fs.readFileSync(`${__dirname}/database/posts.json`));
} catch (err) {
  posts = [];
}

try {
  comments = JSON.parse(fs.readFileSync(`${__dirname}/database/comments.json`));
} catch (err) {
  comments = [];
}

const db = {
  users,
  posts,
  comments,
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

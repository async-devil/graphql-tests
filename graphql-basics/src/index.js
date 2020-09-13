import {GraphQLServer} from 'graphql-yoga'

/* Custom modules requirement */
import Query from './resolvers/query'
import Mutation from './resolvers/mutation'
import User from './resolvers/user'
import Post from './resolvers/post'
import Comment from './resolvers/comment'
/*  */

/* Server options */
const opts = {
  port: 4003
}
/*  */

/* Test temporary database */

try {
  var users = JSON.parse(fs.readFileSync(`${__dirname}/database/users.json`));
  //checking if file containing json, if not cathing error
} catch (e) {
  var users = [];
}

try {
  var posts = JSON.parse(fs.readFileSync(`${__dirname}/database/posts.json`));
} catch (err) {
  var posts = [];
}

try {
  var comments = JSON.parse(fs.readFileSync(`${__dirname}/database/comments.json`));
} catch (err) {
  var comments = [];
}

var db = {
  users,
  posts,
  comments,
}
/*  */

/* Configurating test server */
const server = new GraphQLServer({
  typeDefs: `${__dirname}/typeDefs.graphql`, //type definitions
  resolvers: {
    Query,
    Mutation,
    User,
    Post,
    Comment
  },
  context: {
    db
  },
})
/*  */
console.log(Query, Mutation);
/* Starting server */
server.start(opts, () => {
  console.log(`Server started on port ${opts.port}`);
})
/*  */

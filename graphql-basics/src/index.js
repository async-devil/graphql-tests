import {GraphQLServer} from 'graphql-yoga'
// import uuidv4 from 'uuid/v4'
const fs = require('fs');

const singleElementSearch = require('./modules/singleElementSearch.js');
const doubleElementSearch = require('./modules/doubleElementSearch.js');
//const singleMultipleObjectSearch = require('./modules/singleMultipleObjectSearch.js');
const addUser = require('./modules/addUser.js');
const addPost = require('./modules/addPost.js');

// const pushAllData = function(users, posts, comments) {
//   var data = [users, posts, comments,];
//   add all data to one array
//   fs.writeFileSync(`${__dirname}/database.json`, JSON.stringify(data));
//   rewriting database.json file
// }

const pushData = (data, fileName) => {
  fs.writeFileSync(`${__dirname}/database/${fileName}.json`, JSON.stringify(data));
}

const opts = {
  //server options
  port: 4001
}

try {
  var users = JSON.parse(readFileSync(`${__dirname}/database/users.json`));
  var posts = JSON.parse(readFileSync(`${__dirname}/database/posts.json`));
  var comments = JSON.parse(readFileSync(`${__dirname}/database/comments.json`));
} catch (e) {
  var users = [];
  var posts = [];
  var comments = [];
}

//Type definitions
const typeDefs = `
  type Query {
    me: User!
    posts(searchByAuthor: String, searchByTitle: String): [Post]
    comments(searchByAuthor: String, searchByBody: String): [Comment]
    users(searchByID: String, searchByUsername: String): [User]
  }

  type Mutation {
    createUser(username: String!, email: String!): User!
    createPost(title: String!,
    body: String!,
    published: Boolean!) Post!
  }

  type Post {
    title: String!
    body: String!
    published: Boolean!
    id: ID!
    author: User!
    comments: [Comment!]
    rating: Float!
  }

  type Comment {
    body: String!
    published: Boolean!
    id: ID!
    author: User!
    post: Post!
  }

  type User {
    username: String!
    id: ID!
    email: String!
    posts: [Post!]
    comments: [Comment!]
  }
`

//Resolvers

const resolvers = {
  Query: {
    users(parent, args, ctx, info) {
      return doubleElementSearch(args.searchByID, args.searchByUsername, users, 'id', 'username')
    },
    posts(parent, args, ctx, info) {
      if (args.searchByAuthor != '') {
        var data = singleElementSearch(args.searchByAuthor, users, 'username')
        try {
          args.searchByAuthor = data[0].id
        } catch (e) {
          return []
        }
      }
      return doubleElementSearch(args.searchByAuthor, args.searchByTitle, posts, 'author', 'title')
    },
    comments(parent, args, ctx, info) {
      if (args.searchByAuthor != '') {
        var data = singleElementSearch(args.searchByAuthor, users, 'username')
        try {
          args.searchByAuthor = data[0].id
        } catch (e) {
          return []
        }
      }
      return doubleElementSearch(args.searchByAuthor, args.searchByBody, comments, 'author', 'body')
    },
    me(parent, args, ctx, info) {
      return {username: 'test', id: '111-111-111', email: 'test@test.com', age: 21,}
    },
  },
  Mutation: {
    createUser(parent, args, ctx, info) {
      var newUser = addUser(users, args);
      users.push(newUser)
      pushData(users, 'users');

      return newUser;
    },
    createPost(parent, args, ctx, info) {
      var newPost = addPost(posts, args);
      posts.push(newPost)
      pushData(posts, 'posts')

      return newPost;
    }
  },
  Post: {
    author(parent, args, ctx, info) {
      return users.find((user) => {
        return user.id === parent.author
      })
    },
    comments(parent, args, ctx, info) {
      return comments.filter(comment => {
        return comment.post === parent.id
      });
    },
  },
  User: {
    posts(parent, args, ctx, info) {
      return posts.filter(post => {
        return post.author === parent.id
        //if post author (id value) = user.id then user.posts = posts that filterd
      });
    },
    comments(parent, args, ctx, info) {
      return comments.filter(comment => {
        return comment.author === parent.id
      });
    },
  },
  Comment: {
    author(parent, args, ctx, info) {
      return users.find((user) => {
        return user.id === parent.author
        //if user.id = comment.author then comment.author = founded user
      })
    },
    post(parent, args, ctx, info) {
      return users.find((post) => {
        return post.id === parent.post
      })
    },
  },
}

const server = new GraphQLServer({typeDefs, resolvers,})
server.start(opts, () => {
  console.log(`server started on port ${opts.port}`);
})

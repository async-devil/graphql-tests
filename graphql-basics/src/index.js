import {GraphQLServer} from 'graphql-yoga'
const fs = require('fs');

const singleElementSearch = require('./modules/singleElementSearch.js');
const doubleElementSearch = require('./modules/doubleElementSearch.js');
//const singleMultipleObjectSearch = require('./modules/singleMultipleObjectSearch.js');

const opts = {
  port: 4001
}
//demo db
var data = JSON.parse(fs.readFileSync(`${__dirname}/database.json`))

var {
  users,
  posts,
  comments
} = data

//Type definitions

const typeDefs = `
  type Query {
    me: User!
    posts(searchByAuthor: String, searchByTitle: String): [Post]
    comments(searchByAuthor: String, searchByBody: String): [Comment]
    users(searchByID: String, searchByUsername: String): [User]
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
    age: Int
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
      return {username: 'test', id: '111-111-111', email: 'test@test.com', age: 21}
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
    }
  },
  User: {
    posts(parent, args, ctx, info) {
      return posts.filter(post => {
        return post.author === parent.id
      });
    },
    comments(parent, args, ctx, info) {
      return comments.filter(comment => {
        return comment.author === parent.id
      });
    }
  },
  Comment: {
    author(parent, args, ctx, info) {
      return users.find((user) => {
        return user.id === parent.author
      })
    },
    post(parent, args, ctx, info) {
      return users.find((post) => {
        return post.id === parent.post
      })
    }
  }

}

const server = new GraphQLServer({typeDefs, resolvers})
server.start(opts, () => {
  console.log(`server started on port ${opts.port}`);
})

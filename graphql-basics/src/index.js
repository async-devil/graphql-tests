import {GraphQLServer} from 'graphql-yoga'
const search = require('./searchFunc.js');

const opts = {
  port: 4001
}

//demo DB
const users = [
  {
    username: 'async-devil',
    id: '#1111',
    email: 'async.devil@gmail.com',
    age: 27
  }, {
    username: 'test_user',
    id: '#1112',
    email: 'test@test.com'
  }, {
    username: 'test_user2',
    id: '#1113',
    email: 'test2@test.com'
  }
]
const posts = [
  {
    title: 'Test heading',
    body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
    published: true,
    id: '#2111',
    author: '#1111',
    rating: 4.3
  }, {
    title: 'Test heading 2',
    body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
    published: true,
    id: '#2112',
    author: '#1112',
    rating: 5
  }
]

const comments = [
  {
    body: 'Amazing!',
    published: true,
    id: '#3111',
    author: '#1111',
    post: '#2111'
  },
  {
    body: 'Wow',
    published: false,
    id: '#3112',
    author: '#1112',
    post: '#2111'
  },
  {
    body: 'OMG',
    published: true,
    id: '#3113',
    author: '#1111',
    post: '#2112'
  }
]

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
      return search(args.searchByID, args.searchByUsername, users, 'id', 'username')
    },
    posts(parent, args, ctx, info) {
      return search(args.searchByAuthor, args.searchByTitle, posts, 'author.username', 'title')
    },
    comments(parent, args, ctx, info) {
      return search(args.searchByAuthor, args.searchByBody, comments, 'author.username', 'body')
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

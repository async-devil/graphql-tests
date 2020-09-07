import {GraphQLServer} from 'graphql-yoga'
// import uuidv4 from 'uuid/v4'
const fs = require('fs');

const singleElementSearch = require('./modules/searchFunctions/singleElementSearch.js');
const doubleElementSearch = require('./modules/searchFunctions/doubleElementSearch.js');
//const singleMultipleObjectSearch = require('./modules/searchFunctions/singleMultipleObjectSearch.js');
const addUser = require('./modules/addFunctions/addUser.js');
const addPost = require('./modules/addFunctions/addPost.js');
const addComments = require('./modules/addFunctions/addComment.js');

const pushData = (data, fileName) => {
  fs.writeFileSync(`${__dirname}/database/${fileName}.json`, JSON.stringify(data));
}

const opts = {
  //server options
  port: 4002
}

try {
  var users = JSON.parse(fs.readFileSync(`${__dirname}/database/users.json`));
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

//Type definitions
const typeDefs = `
  type Query {
    me: User!
    posts(searchByAuthor: String, searchByTitle: String): [Post]
    comments(searchByAuthor: String, searchByBody: String): [Comment]
    users(searchByID: String, searchByUsername: String): [User]
  }

  type Mutation {
    createUser(data: createUserInput): User!
    createPost(data: createPostInput): Post!
    createComment(data: createCommentsInput): Comment!
  }

  input createUserInput {
    username: String!,
    email: String!
  }

  input createPostInput {
    title: String!,
    body: String!,
    published: Boolean!,
    author: ID!
  }

  input createCommentsInput {
    body: String!,
    published: Boolean!,
    author: ID!,
    post: ID!
  }

  type Post {
    title: String!
    body: String!
    published: Boolean!
    id: ID!
    author: User!
    comments: [Comment!]
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
      var newUser = addUser(users, args.data);
      users.push(newUser)
      pushData(users, 'users');

      return newUser;
    },
    createPost(parent, args, ctx, info) {
      var newPost = addPost(posts, args.data, users);
      posts.push(newPost)
      pushData(posts, 'posts')

      return newPost;
    },
    createComment(parent, args, ctx, info) {
      var newComment = addComments(comments, args.data, users, posts);
      comments.push(newComment)
      pushData(comments, 'comments')

      return newComment;
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
      return posts.find((post) => {
        return post.id === parent.post
      })
    },
  },
}

const server = new GraphQLServer({typeDefs, resolvers,})
server.start(opts, () => {
  console.log(`server started on port ${opts.port}`);
})

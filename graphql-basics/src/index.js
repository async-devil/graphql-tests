import {GraphQLServer} from 'graphql-yoga'
const fs = require('fs');

/* Custom modules requirement */
const singleElementSearch = require('./modules/searchFunctions/singleElementSearch.js');
const doubleElementSearch = require('./modules/searchFunctions/doubleElementSearch.js');
//const singleMultipleObjectSearch = require('./modules/searchFunctions/singleMultipleObjectSearch.js');
const addUser = require('./modules/addFunctions/addUser.js');
const addPost = require('./modules/addFunctions/addPost.js');
const addComments = require('./modules/addFunctions/addComment.js');

const removeUser = require('./modules/deleteFunctions/deleteUser.js');
const removePost = require('./modules/deleteFunctions/deletePost.js');
const removeComment = require('./modules/deleteFunctions/deleteComment.js');
/*  */

/* Server options */
const opts = {
  port: 4003
}
/*  */

/* Test temporary database */
const pushData = (data, fileName) => {
  fs.writeFileSync(`${__dirname}/database/${fileName}.json`, JSON.stringify(data));
}

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

/* Resolvers part */
const resolvers = {
  Query: {
    users(parent, args, {
      db
    }, info) {
      return doubleElementSearch(args.searchByID, args.searchByUsername, db.users, 'id', 'username')
    },
    posts(parent, args, {
      db
    }, info) {
      if (args.searchByAuthor != '') {
        var data = singleElementSearch(args.searchByAuthor, db.users, 'username')
        //searching user id by username
        try {
          args.searchByAuthor = data[0].id
          //if found then searchByAuthor redeclaremets into id field
        } catch (e) {
          //else
          return []
        }
      }
      return doubleElementSearch(args.searchByAuthor, args.searchByTitle, db.posts, 'author', 'title')
      //search by author id and post title
    },
    comments(parent, args, {
      db
    }, info) {
      if (args.searchByAuthor != '') {
        var data = singleElementSearch(args.searchByAuthor, db.users, 'username')
        //same id search
        try {
          args.searchByAuthor = data[0].id
        } catch (e) {
          return []
        }
      }
      return doubleElementSearch(args.searchByAuthor, args.searchByBody, db.comments, 'author', 'body')
      //searc by author id and comment body
    },
  },
  Mutation: {
    createUser(parent, args, {
      db
    }, info) {
      var newUser = addUser(db.users, args.data);
      db.users.push(newUser)
      pushData(db.users, 'users');

      return newUser;
    },
    deleteUser(parent, args, {
      db
    }, info) {
      var deletedUser;

      function gettingData(users, posts, comments, args, callback) {
        var data = removeUser(users, posts, comments, args)
        callback(data)
      }
      gettingData(db.users, db.posts, db.comments, args, (data) => {
        var {
          users,
          posts,
          comments,
        } = data
        deletedUser = data.deletedUser

        pushData(users, 'users');
        pushData(posts, 'posts');
        pushData(comments, 'comments');
      })

      return deletedUser;
    },
    createPost(parent, args, {
      db
    }, info) {
      var newPost = addPost(db.posts, args.data, db.users);
      db.posts.push(newPost)
      pushData(db.posts, 'posts')

      return newPost;
    },
    deletePost(parent, args, {
      db
    }, info) {
      var deletedPost

      function gettingData(posts, comments, args, callback) {
        var data = removePost(posts, comments, args)
        callback(data)
      }

      gettingData(db.posts, db.comments, args, (data) => {
        var {
          posts,
          comments,
        } = data;
        deletedPost = data.deletedPost

        pushData(posts, 'posts');
        pushData(comments, 'comments')
      })

      return deletedPost;
    },
    createComment(parent, args, {
      db
    }, info) {
      var newComment = addComments(db.comments, args.data, db.users, db.posts);
      db.comments.push(newComment)
      pushData(db.comments, 'comments')

      return newComment;
    },
    deleteComment(parent, args, {
      db
    }, info) {
      var deletedComment;

      function gettingData(comments, args, callback) {
        var data = removeComment(comments, args)
        callback(data)
      }

      gettingData(db.comments, args, (data) => {
        var {
          comments
        } = data;
        deletedComment = data.deletedComment

        pushData(comments, 'comments')
      })

      return deletedComment;
    },
  },
  Post: {
    author(parent, args, {
      db
    }, info) {
      return db.users.find((user) => {
        return user.id === parent.author
      })
    },
    comments(parent, args, {
      db
    }, info) {
      return db.comments.filter(comment => {
        return comment.post === parent.id
      });
    }
  },
  User: {
    posts(parent, args, {
      db
    }, info) {
      return db.posts.filter(post => {
        return post.author === parent.id
        //if post author (id value) = user.id then user.posts = posts that filterd
      });
    },
    comments(parent, args, {
      db
    }, info) {
      return db.comments.filter(comment => {
        return comment.author === parent.id
      });
    }
  },
  Comment: {
    author(parent, args, {
      db
    }, info) {
      return db.users.find((user) => {
        return user.id === parent.author
        //if user.id = comment.author then comment.author = founded user
      })
    },
    post(parent, args, {
      db
    }, info) {
      return db.posts.find((post) => {
        return post.id === parent.post
      })
    }
  }
}
/*  */

/* Configurating test server */
const server = new GraphQLServer({
  typeDefs: `${__dirname}/typeDefs.graphql`, //type definitions
  resolvers,
  context: {
    db
  },
})
/*  */

/* Starting server */
server.start(opts, () => {
  console.log(`Server started on port ${opts.port}`);
})
/*  */

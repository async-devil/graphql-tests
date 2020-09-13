const fs = require('fs');

const singleElementSearch = require('../modules/searchFunctions/singleElementSearch.js');
const doubleElementSearch = require('../modules/searchFunctions/doubleElementSearch.js');
//const singleMultipleObjectSearch = require('./modules/searchFunctions/singleMultipleObjectSearch.js');
const addUser = require('../modules/addFunctions/addUser.js');
const addPost = require('../modules/addFunctions/addPost.js');
const addComments = require('../modules/addFunctions/addComment.js');

const removeUser = require('../modules/deleteFunctions/deleteUser.js');
const removePost = require('../modules/deleteFunctions/deletePost.js');
const removeComment = require('../modules/deleteFunctions/deleteComment.js');

const pushData = (data, fileName) => {
  fs.writeFileSync(`${__dirname}/../database/${fileName}.json`, JSON.stringify(data));
}

const mutation = {
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
        comments
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
        comments
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
  }
}

export {
  mutation as default
}

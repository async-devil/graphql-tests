const fs = require('fs');

const addUser = require('../modules/addFunctions/addUser.js');
const addPost = require('../modules/addFunctions/addPost.js');
const addComments = require('../modules/addFunctions/addComment.js');
const removeUser = require('../modules/deleteFunctions/deleteUser.js');
const removePost = require('../modules/deleteFunctions/deletePost.js');
const removeComment = require('../modules/deleteFunctions/deleteComment.js');

const mutation = {
  createUser(parent, args, {
    db,
  }) {
    const newUser = addUser(db.users, args.data);
    db.users.push(newUser);
    pushData(db.users, 'users');
    return newUser;
  },
  deleteUser(parent, args, {
    db,
  }) {
    let deletedUser;

    function gettingData(users, posts, comments, callback) {
      const data = removeUser(users, posts, comments, args);
      callback(data);
    }
    gettingData(db.users, db.posts, db.comments, args, (data) => {
      const {
        users,
        posts,
        comments,
      } = data;
      deletedUser = data.deletedUser;
      pushData(users, 'users');
      pushData(posts, 'posts');
      pushData(comments, 'comments');
    });
    return deletedUser;
  },
  updateUser(parent, args, {
    db,
  }) {
    // function gettingData(users, callback) {
    //   const data = updateUser(users, args);
    //   callback(data)
    // }
    //
    // gettingData(db.users, args, (data) => {
    //
    // })
    const updatedUser = updateUser(db.users, args);
    pus;
  },
  createPost(parent, args, {
    db,
  }) {
    const newPost = addPost(db.posts, args.data, db.users);
    db.posts.push(newPost);
    pushData(db.posts, 'posts');
    return newPost;
  },
  deletePost(parent, args, {
    db,
  }) {
    let deletedPost;

    function gettingData(posts, comments, callback) {
      const data = removePost(posts, comments, args);
      callback(data);
    }
    gettingData(db.posts, db.comments, args, (data) => {
      const {
        posts,
        comments,
      } = data;
      deletedPost = data.deletedPost;
      pushData(posts, 'posts');
      pushData(comments, 'comments');
    });
    return deletedPost;
  },
  createComment(parent, args, {
    db,
  }) {
    const newComment = addComments(db.comments, args.data, db.users, db.posts);
    db.comments.push(newComment);
    pushData(db.comments, 'comments');
    return newComment;
  },
  deleteComment(parent, args, {
    db,
  }) {
    let deletedComment;

    function gettingData(comments, callback) {
      const data = removeComment(comments, args);
      callback(data);
    }
    gettingData(db.comments, args, (data) => {
      const {
        comments,
      } = data;
      deletedComment = data.deletedComment;
      pushData(comments, 'comments');
    });
    return deletedComment;
  },
};
export {
  mutation as
  default,
};

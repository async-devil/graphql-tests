const addUser = require('../modules/addFunctions/addUser.js');
const addPost = require('../modules/addFunctions/addPost.js');
const addComments = require('../modules/addFunctions/addComment.js');
const removeUser = require('../modules/deleteFunctions/deleteUser.js');
const removePost = require('../modules/deleteFunctions/deletePost.js');
const removeComment = require('../modules/deleteFunctions/deleteComment.js');
const updateUser = require('../modules/updateFunctions/updateUser.js');

const mutation = {
  createUser(parent, args, {
    db,
  }) {
    const user = addUser(db.users, args.data);
    db.users.push(user);
    return user; 
  },
  deleteUser(parent, args, {
    db,
  }) {
    const data = removeUser(db.users, db.posts, db.comments, args);
    db.users = data.users;
    return data.deletedUser;
  },
  updateUser(parent, args, {
    db,
  }) {
    return updateUser(db.users, args);
  },
  createPost(parent, args, {
    db,
  }) {
    const post = addPost(db.posts, args.data, db.users);
    db.posts.push(post)
    return post;
  },
  deletePost(parent, args, {
    db,
  }) {
    return removePost(db.posts, db.comments, args);
  },
  createComment(parent, args, {
    db,
  }) {
    return addComments(db.comments, args.data, db.users, db.posts);
  },
  deleteComment(parent, args, {
    db,
  }) {
    const data = removeComment(db.comments, args);
    return data.deletedComment;
  },
};
export {
  mutation as
  default,
};

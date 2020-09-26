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
    db.posts = data.posts;
    db.comments = data.comments;
    return data.deletedUser;
  },
  updateUser(parent, args, {
    db,
  }) {
    const data = updateUser(db.users, args);
    db.users = data.updatedUsers;
    return data.updatedUser
  },
  createPost(parent, args, {
    db,
  }) {
    const post = addPost(db.posts, args.data, db.users);
    db.posts.push(post);
    return post;
  },
  deletePost(parent, args, {
    db,
  }) {
    const data = removePost(db.posts, db.comments, args);
    db.posts = data.posts;
    db.comments = data.comments;
    return data.deletedPost;
  },
  createComment(parent, args, {
    db,
  }) {
    const comment = addComments(db.comments, args.data, db.users, db.posts);
    db.comments.push(comment);
    return comment;
  },
  deleteComment(parent, args, {
    db,
  }) {
    const data = removeComment(db.comments, args);
    db.comments = data.comments;
    return data.deletedComment;
  },
};
export {
  mutation as
  default,
};

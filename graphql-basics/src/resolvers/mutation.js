const addUser = require('../modules/addFunctions/addUser.js');
const addPost = require('../modules/addFunctions/addPost.js');
const addComments = require('../modules/addFunctions/addComment.js');

const removeUser = require('../modules/deleteFunctions/deleteUser.js');
const removePost = require('../modules/deleteFunctions/deletePost.js');
const removeComment = require('../modules/deleteFunctions/deleteComment.js');

const updateUser = require('../modules/updateFunctions/updateUser.js');
const updatePost = require('../modules/updateFunctions/updatePost.js');
const updateComment = require('../modules/updateFunctions/updateComment.js');

const mutation = {

  /* Users mutations */
  createUser(parent, args, {
    db,
  }) {
    const user = addUser(db.users, args.data);
    // pushing
    db.users.push(user);
    return user;
  },

  deleteUser(parent, args, {
    db,
  }) {
    const data = removeUser(db.users, db.posts, db.comments, args);
    // reassigning db
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
    return data.updatedUser;
  },
  /* */

  /* Posts mutations */
  createPost(parent, args, {
    db, pubsub,
  }) {
    const post = addPost(db.posts, args.data, db.users);
    db.posts.push(post);

    if (post.published) {
      pubsub.publish(`post by ${post.author}`, {
        post: {
          mutation: 'CREATED',
          data: post,
        },
      });
    }

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

  updatePost(parent, args, {
    db, pubsub,
  }) {
    const data = updatePost(db.posts, args);
    const post = data.updatedPost;
    db.posts = data.updatedPosts;

    // if (post.published) {
    //   pubsub.publish(`post by ${post.author}`, {post})
    // }

    return post;
  },
  /* */

  /* Comments mutations */
  createComment(parent, args, {
    db, pubsub,
  }) {
    const comment = addComments(db.comments, args.data, db.users, db.posts);
    db.comments.push(comment);

    if (comment.published) {
      pubsub.publish(`comment on ${comment.post}`, { comment });
    }

    return comment;
  },

  deleteComment(parent, args, {
    db,
  }) {
    const data = removeComment(db.comments, args);
    db.comments = data.comments;
    return data.deletedComment;
  },

  updateComment(parent, args, {
    db, pubsub,
  }) {
    const data = updateComment(db.comments, args);
    db.comments = data.updatedComments;
    const comment = data.updatedComment;

    // if (comment.published) {
    //   pubsub.publish(`comment on ${comment.post}`, {comment})
    // }

    return comment;
  },
  /* */
};

export {
  mutation as
  default,
};

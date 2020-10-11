import addUser from '../modules/addFunctions/addUser';
import addPost from '../modules/addFunctions/addPost';
import addComments from '../modules/addFunctions/addComment';

import removeUser from '../modules/deleteFunctions/deleteUser';
import removePost from '../modules/deleteFunctions/deletePost';
import removeComment from '../modules/deleteFunctions/deleteComment';

import updateUser from '../modules/updateFunctions/updateUser';
import updatePost from '../modules/updateFunctions/updatePost';
import updateComment from '../modules/updateFunctions/updateComment';

const mutation = {

  /* Users mutations */
  createUser(parent, args, { db }) {
    const user = addUser(db.users, args.data);
    // pushing
    db.users.push(user);
    return user;
  },

  deleteUser(parent, args, { db }) {
    const data = removeUser(db.users, db.posts, db.comments, args);
    // reassigning db
    db.users = data.users;
    db.posts = data.posts;
    db.comments = data.comments;

    return data.deletedUser;
  },

  updateUser(parent, args, { db }) {
    const data = updateUser(db.users, args);
    db.users = data.updatedUsers;
    return data.updatedUser;
  },
  /*  */

  /* Posts mutations */
  createPost(parent, args, { db, pubsub }) {
    const post = addPost(db.posts, args.data, db.users);
    db.posts.push(post);

    if (post.published) {
      pubsub.publish(`post by ${post.author}`, {
        userPost: {
          mutation: 'CREATED',
          data: post,
        },
      });
      pubsub.publish('post', {
        post: {
          mutation: 'CREATED',
          data: post,
        },
      });
    }
    return post;
  },

  deletePost(parent, args, { db, pubsub }) {
    const data = removePost(db.posts, db.comments, args);
    db.posts = data.posts;
    db.comments = data.comments;

    const post = data.deletedPost;

    if (post.published) {
      pubsub.publish(`post by ${post.author}`, {
        userPost: {
          mutation: 'DELETED',
          data: post,
        },
      });
      pubsub.publish('post', {
        post: {
          mutation: 'DELETED',
          data: post,
        },
      });
    }
    return post;
  },

  updatePost(parent, args, { db, pubsub }) {
    const data = updatePost(db.posts, args);
    const post = data.updatedPost;
    db.posts = data.updatedPosts;

    if (post.published || data.postMethod === 'DELETED') {
      pubsub.publish(`post by ${post.author}`, {
        userPost: {
          mutation: data.postMethod,
          data: post,
        },
      });
      pubsub.publish('post', {
        post: {
          mutation: data.postMethod,
          data: post,
        },
      });
    }
    return post;
  },
  /*  */

  /* Comments mutations */
  createComment(parent, args, { db, pubsub }) {
    const comment = addComments(db.comments, args.data, db.users, db.posts);
    db.comments.push(comment);

    if (comment.published) {
      pubsub.publish(`comment on ${comment.post}`, {
        comment: {
          mutation: 'CREATED',
          data: comment,
        },
      });
    }
    return comment;
  },

  deleteComment(parent, args, { db, pubsub }) {
    const data = removeComment(db.comments, args);
    db.comments = data.comments;
    const comment = data.deletedComment;

    if (comment.published) {
      pubsub.publish(`comment on ${comment.post}`, {
        comment: {
          mutation: 'DELETED',
          data: comment,
        },
      });
    }
    return comment;
  },

  updateComment(parent, args, { db, pubsub }) {
    const data = updateComment(db.comments, args);
    db.comments = data.updatedComments;
    const comment = data.updatedComment;

    if (comment.published || data.commentMethod === 'DELETED') {
      pubsub.publish(`comment on ${comment.post}`, {
        comment: {
          mutation: data.commentMethod,
          data: comment,
        },
      });
    }
    return comment;
  },
};

/*  */
export {
  mutation as
  default,
};

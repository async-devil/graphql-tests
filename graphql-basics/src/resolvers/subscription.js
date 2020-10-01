const subscription = {
  comment: {
    subscribe(parent, { postID }, { db, pubsub }, info) {
      const subscriptionPost = db.posts.find((post) => post.id === postID && post.published);

      if (!subscriptionPost) throw new Error('Post not found');

      return pubsub.asyncIterator(`comment on ${postID}`);
    },
  },
  post: {
    subscribe(parent, { userID }, { db, pubsub }, info) {
      const subscriptionUser = db.users.find((user) => user.id === userID);

      if (!subscriptionUser) throw new Error('User not find');

      return pubsub.asyncIterator(`post by ${userID}`);
    },
  },
};

export { subscription as default };

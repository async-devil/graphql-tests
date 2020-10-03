const subscription = {
  comment: {
    subscribe(parent, { postID }, { db, pubsub }, info) {
      const subscriptionPost = db.posts.find((post) => post.id === postID && post.published);

      if (!subscriptionPost) throw new Error('Post not found');

      return pubsub.asyncIterator(`comment on ${postID}`);
    },
  },
  userPost: {
    subscribe(parent, { userID }, { db, pubsub }, info) {
      const subscriptionUser = db.users.find((user) => user.id === userID);

      if (!subscriptionUser) throw new Error('User not find');

      return pubsub.asyncIterator(`post by ${userID}`);
    },
  },
post: {
  subscribe(parent, args, {db, pubsub}, info) {
    return pubsub.asyncIterator('post');
  }
}
};
export { subscription as default };

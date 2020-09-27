const subscription = {
  comment: {
    subscribe(parent, {postID}, {db, pubsub}, info) {
      const post = db.posts.find((post) => post.id === postID && post.published);

      if (!post) throw new Error('Post not found');

      return pubsub.asyncIterator(`comment ${postID}`)
    }
  }
}

export {subscription as default};

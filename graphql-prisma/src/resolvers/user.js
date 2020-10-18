const user = {
  posts(parent, args, {
    db,
  }) {
    return db.posts.filter((post) => post.author === parent.id);
    // if post.author(id value) equals to user.id then user posts reassignment to posts that filterd
  },
  comments(parent, args, {
    db,
  }) {
    return db.comments.filter((comment) => comment.author === parent.id);
    // the same thing but with comments
  },
};

export {
  user as default,
};

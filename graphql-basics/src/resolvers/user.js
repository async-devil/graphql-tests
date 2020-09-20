const user = {
  posts(parent, args, {
    db,
  }) {
    return db.posts.filter((post) => post.author === parent.id);
    // if post author (id value) = user.id then user.posts = posts that filterd
  },
  comments(parent, args, {
    db,
  }) {
    return db.comments.filter((comment) => comment.author === parent.id);
  },
};

export {
  user as default,
};

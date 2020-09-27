const post = {
  author(parent, args, {
    db,
  }) {
    return db.users.find((user) => user.id === parent.author);
    //searching for author by post.id
  },
  comments(parent, args, {
    db,
  }) {
    return db.comments.filter((comment) => comment.post === parent.id);
    //searching for comments by post.id
  },
};

export {
  post as default,
};

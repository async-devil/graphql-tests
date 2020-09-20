const post = {
  author(parent, args, {
    db,
  }) {
    return db.users.find((user) => user.id === parent.author);
  },
  comments(parent, args, {
    db,
  }) {
    return db.comments.filter((comment) => comment.post === parent.id);
  },
};

export {
  post as default,
};

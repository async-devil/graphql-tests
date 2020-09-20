const comment = {
  author(parent, args, {
    db,
  }) {
    return db.users.find((user) => user.id === parent.author);
  },
  post(parent, args, {
    db,
  }) {
    return db.posts.find((post) => post.id === parent.post);
  },
};

export {
  comment as default,
};

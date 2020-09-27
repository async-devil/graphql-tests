const comment = {
  author(parent, args, {
    db,
  }) {
    return db.users.find((user) => user.id === parent.author);
    //returning user which id equals to comment.author(user.id)
  },
  post(parent, args, {
    db,
  }) {
    return db.posts.find((post) => post.id === parent.post);
    //the same thing but with post
  },
};

export {
  comment as default,
};

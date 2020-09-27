function deleteUser(users, posts, comments, args) {
  let filteredComments = comments;
  const userIndex = users.findIndex((user) => user.id === args.id);
  // finding user index by id

  if (userIndex === -1) {
    throw new Error('User not found');
  }

  const deletedUser = users.splice(userIndex, 1);

  const filteredPosts = posts.filter((post) => {
    const match = post.author === args.id;

    if (match) {
      filteredComments = filteredComments.filter((comment) => comment.post !== post.id);
      // slicing out comments which are on users post
    }

    return !match;
  });

  filteredComments = filteredComments.filter((comment) => comment.author !== args.id);
  // slicing out comments which user created

  return {
    users, posts: filteredPosts, comments: filteredComments, deletedUser: deletedUser[0],
  };
}

module.exports = deleteUser;

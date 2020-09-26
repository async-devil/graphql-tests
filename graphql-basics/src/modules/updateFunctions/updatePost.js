function updatePost(posts, args) {
  const {id, data} = args;
  let updatedPosts = posts;

  const postToUpdate = posts.find((post) => post.id === data.id);
  const postIndex = post.findIndex((post) => post.id === data.id);

  if (!postToUpdate) {
    throw new Error("Post not find")
  }

  if (typeof data.title === 'string') {
    userToUpdate.title = data.title;
  }

  if (typeof data.body === 'string') {
    userToUpdate.body = data.body;
  }

  if (typeof data.published === 'boolean') {
    userToUpdate.published = data.published;
  }

  updatedPosts[postIndex] = postToUpdate;
  return {updatedPost: userToUpdate, updatedPosts};
}

module.exports = updatePost;

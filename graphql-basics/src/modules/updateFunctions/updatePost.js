function updatePost(posts, args) {
  const { id, data } = args;
  const updatedPosts = posts;

  const postToUpdate = posts.find((post) => post.id === id);
  const postIndex = posts.findIndex((post) => post.id === id);

  if (!postToUpdate) {
    throw new Error('Post not find');
  }

  if (typeof data.title === 'string') {
    postToUpdate.title = data.title;
  }

  if (typeof data.body === 'string') {
    postToUpdate.body = data.body;
  }

  if (typeof data.published === 'boolean') {
    postToUpdate.published = data.published;
  }

  updatedPosts[postIndex] = postToUpdate;
  return { updatedPost: postToUpdate, updatedPosts };
}

export { updatePost as default };

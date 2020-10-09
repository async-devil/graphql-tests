function updatePost(posts, args) {
  const { id, data } = args;

  const updatedPosts = posts;
  let {published} = posts.find((post) => post.id === id);
  const postToUpdate = posts.find((post) => post.id === id);
  const postIndex = posts.findIndex((post) => post.id === id);
  let postMethod;

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

    console.log(postToUpdate, published);

    if (published && !postToUpdate.published) {
      postMethod = 'DELETED';
    } else if (!published && postToUpdate.published) {
      postMethod = 'CREATED';
    } else {
      postMethod = 'UPDATED';
    }
  }

  updatedPosts[postIndex] = postToUpdate;
  return { updatedPost: postToUpdate, updatedPosts, postMethod };
}

export { updatePost as default };

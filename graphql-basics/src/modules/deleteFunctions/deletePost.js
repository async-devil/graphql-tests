function removePost(posts, comments, args) {
  const postIndex = posts.findIndex((post) => post.id === args.id);
  // finding post by id

  if (postIndex === -1) {
    throw new Error('Post not found');
  }

  const deletedPost = posts.splice(postIndex, 1);

  const filteredComments = comments.filter((comment) => {
    const match = comment.post === args.id;
    return !match;
    // returning comments which didin`t left on deleting post
  });

  return { posts, comments: filteredComments, deletedPost: deletedPost[0] };
}

module.exports = removePost;

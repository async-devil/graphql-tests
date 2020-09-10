function removePost(posts, comments, args) {
  var postIndex = posts.findIndex((post) => post.id === args.id)
  
  if (postIndex === -1) {
    throw new Error('Post not found')
  }

  var deletedPost = posts.splice(postIndex, 1);

  comments = comments.filter((comment) => {
    var match = comment.post === args.id;
    return !match
  })

  return {posts, comments, deletedPost: deletedPost[0]}
}

module.exports = removePost;

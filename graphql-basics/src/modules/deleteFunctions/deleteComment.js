function removeComment(comments, args) {
  var commentIndex = comments.findIndex((comment) => comment.id === args.id);

  if (commentIndex === -1) {
    throw new Error('Comment not found')
  }

  var deletedComment = comments.splice(commentIndex, 1)

  return {comments, deletedComment: deletedComment[0]};
}

module.exports = removeComment;

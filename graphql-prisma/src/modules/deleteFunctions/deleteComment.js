function removeComment(comments, args) {
  const commentIndex = comments.findIndex((comment) => comment.id === args.id);

  if (commentIndex === -1) {
    throw new Error('Comment not found');
  }

  const deletedComment = comments.splice(commentIndex, 1);

  return { comments, deletedComment: deletedComment[0] };
}

export { removeComment as default };

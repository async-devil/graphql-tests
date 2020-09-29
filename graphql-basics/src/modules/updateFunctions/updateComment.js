function updateComment(comments, args) {
  const { id, data } = args;
  const updatedComments = comments;

  const commentToUpdate = comments.find((comment) => comment.id === id);
  const commentIndex = comments.findIndex((comment) => comment.id === id);

  if (!commentToUpdate) {
    throw new Error('Comment not find');
  }

  if (typeof data.body === 'string') {
    commentToUpdate.body = data.body;
  }

  if (typeof data.published === 'boolean') {
    commentToUpdate.published = data.published;
  }

  updatedComments[commentIndex] = commentToUpdate;
  return { updatedComment: commentToUpdate, updatedComments };
}

module.exports = updateComment;

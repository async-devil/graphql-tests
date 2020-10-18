function updateComment(comments, args) {
  const { id, data } = args;
  const updatedComments = comments;

  const { published } = comments.find((comment) => comment.id === id);
  const commentToUpdate = comments.find((comment) => comment.id === id);
  const commentIndex = comments.findIndex((comment) => comment.id === id);
  let commentMethod;

  if (!commentToUpdate) {
    throw new Error('Comment not find');
  }

  if (typeof data.body === 'string') {
    commentToUpdate.body = data.body;
  }

  if (typeof data.published === 'boolean') {
    commentToUpdate.published = data.published;

    if (published && !commentToUpdate.published) {
      commentMethod = 'DELETED';
    } else if (!published && commentToUpdate.published) {
      commentMethod = 'CREATED';
    } else {
      commentMethod = 'UPDATED';
    }
  }

  updatedComments[commentIndex] = commentToUpdate;
  return { updatedComment: commentToUpdate, updatedComments, commentMethod };
}

export { updateComment as default };

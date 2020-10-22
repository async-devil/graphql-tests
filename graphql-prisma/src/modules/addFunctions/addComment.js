import { v4 as uuidv4, validate as uuidValidate } from 'uuid';

import validator from 'validator';

function addComment(comments, args, users, posts) {
  const {
    body, published, author, post,
  } = args;

  if (!body || !published || !author || !post) {
    throw new Error('Invalid data');
  }

  for (let i = 0; i < args.length; i += 1) {
    const item = args[i];
    // checking if items not empty
    if (typeof item === 'boolean') {
      return undefined;
    }
    if (validator.isEmpty(item)) {
      throw new Error('Invalid data');
    }
  }

  if (!uuidValidate(author)) {
    throw new Error('Invalid data');
  }
  if (!uuidValidate(post)) {
    throw new Error('Invalid data');
  }

  const userExists = users.some((user) => user.id === author);
  if (!userExists) {
    throw new Error('User not found');
  }

  const postExists = posts.some((item) => item.id === post);
  if (!postExists) {
    throw new Error('Post not found');
  }

  return {
    body, published, id: uuidv4(), author, post,
  };
  // returning newComment object
}

export { addComment as default };

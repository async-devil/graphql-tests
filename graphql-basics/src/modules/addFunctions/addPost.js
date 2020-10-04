import { v4 as uuidv4, validate as uuidValidate } from 'uuid';

import validator from 'validator';

function addPost(posts, args, users) {
  const {
    title, body, published, author,
  } = args;
  if (!title || !body || typeof published !== 'boolean' || !author) {
    throw new Error('Invalid data');
  }

  for (let i = 0, len = args.length; i < len; i += 1) {
    const item = args[i];
    // checking if items not empty
    if (typeof item === 'boolean') {
      return undefined; // not sure about that
    }
    if (validator.isEmpty(item)) {
      throw new Error('Invalid data');
    }
  }

  if (!uuidValidate(author)) {
    throw new Error('Invalid data');
  }

  const userExists = users.some((user) => user.id === author);
  if (!userExists) {
    throw new Error('User not found');
  }

  return {
    title, body, published, id: uuidv4(), author,
  };
  // returning newUser object
}

export { addPost as default };

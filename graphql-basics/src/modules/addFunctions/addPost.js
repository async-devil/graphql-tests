import uuidv4 from 'uuid/v4';
import { validate as uuidValidate } from 'uuid';
import validator from 'validator';

function addPost(posts, args, users) {
  const {
    title, body, published, author,
  } = args;
  if (!title || !body || !published || !author) {
    throw new Error('Invalid data');
  }

  args.forEach((item) => {
    // checking if items not empty
    if (typeof item === 'boolean') {
      return;
    }
    if (validator.isEmpty(item)) {
      throw new Error('Invalid data');
    }
  });

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

module.exports = addPost;

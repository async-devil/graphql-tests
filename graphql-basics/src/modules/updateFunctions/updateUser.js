import validator from 'validator';

function updateUser(users, args) {
  const { id, data } = args;

  const userToUpdate = users.find((user) => user.id === args.id);
  if (!userToUpdate) {
    throw new Error('User not found');
  }

  if (typeof data.email === 'string' && validator.isEmail(data.email)) {
    const emailTaken = users.some((user) => user.email === data.email);

    if (emailTaken) {
      throw new Error('Email has taken');
    }

    userToUpdate.email === data.email;
  }

  if (typeof data.username === 'string' && !validator.isEmpty(item)) {
    userToUpdate.username = data.username;
  }

  return userToUpdate;
}

module.exports = updateUser;

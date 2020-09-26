import validator from 'validator';

function updateUser(users, args) {
  const { id, data } = args;
  let updatedUsers = users;

  const userToUpdate = users.find((user) => user.id === id);
  const userIndex = users.findIndex((user) => user.id === args.id);

  if (!userToUpdate) {
    throw new Error('User not found');
  }

  if (typeof data.email === 'string' && validator.isEmail(data.email)) {
    const emailTaken = users.some((user) => user.email === data.email);
    
    if (emailTaken && data.email !== userToUpdate.email) {
      throw new Error('Email has taken');
    }

    userToUpdate.email = data.email;
  } else throw new Error('Invalid data');

  if (typeof data.username === 'string' && !validator.isEmpty(data.username)) {
    userToUpdate.username = data.username;
  } else throw new Error('Invalid data');

  updatedUsers[userIndex] = userToUpdate
  return {updatedUser: userToUpdate, updatedUsers};
}

module.exports = updateUser;

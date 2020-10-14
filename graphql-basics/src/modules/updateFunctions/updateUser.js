import validator from 'validator';

function updateUser(users, args) {
  const { id, data } = args;
  const updatedUsers = users;

  //finding user
  const userToUpdate = users.find((user) => user.id === id);
  const userIndex = users.findIndex((user) => user.id === args.id);

  //if not found
  if (!userToUpdate) {
    throw new Error('User not found');
  }

  //validating email
  if (typeof data.email === 'string' && validator.isEmail(data.email)) {
    const emailTaken = users.some((user) => user.email === data.email);

    //more validating
    if (emailTaken && data.email !== userToUpdate.email) {
      throw new Error('Email has taken');
    }

    //if all alright updating data
    userToUpdate.email = data.email;
  } else throw new Error('Invalid data');

  //validating username
  if (typeof data.username === 'string' && !validator.isEmpty(data.username)) {
    userToUpdate.username = data.username;
  } else throw new Error('Invalid data');

  //updating test db
  updatedUsers[userIndex] = userToUpdate;
  return { updatedUser: userToUpdate, updatedUsers };
}

export { updateUser as default };

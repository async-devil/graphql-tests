import uuidv4 from 'uuid/v4';
import validator from 'validator';

function addUser(users, args) {
  const { username, email } = args;

  if (!username || !email) {
    // checking if data is existing
    throw new Error('Invalid data');
  }
  for (let i = 0; i < args.length; i += 1) {
    // checking if items not empty
    if (validator.isEmpty(args[i])) {
      throw new Error('Invalid data');
    }
  }

  if (!validator.isEmail(email)) {
    // checking if email valid
    throw new Error('Invalid email');
  }

  const emailTaken = users.some((user) => user.email === email);
  // checking if email used
  const usernameTaken = users.some((user) => user.username === username);
  // checking if username used

  if (emailTaken) {
    // returning error if email has already taken
    throw new Error('This email has taken');
  }
  if (usernameTaken) {
    // returning error if username has already taken
    throw new Error('This username has taken');
  }

  return { username, id: uuidv4(), email };
  // returning newUser object
}

module.exports = addUser;

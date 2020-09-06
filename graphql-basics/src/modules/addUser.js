import uuidv4 from "uuid/v4";
import validator from 'validator';

function addUser(users, args) {
  try {
    //checking if data is existing
    var {
      username,
      email
    } = args;
    var data = Object.values(args) //creating array of args valuses
  } catch (e) {
    throw new Error("Invalid data");
  };

  data.forEach((item, i) => {
    //checking if items not empty
    if (validator.isEmpty(item)) {
      throw new Error("Invalid data")
    }
  });

  if (!validator.isEmail(email)) {
    //checking if email valid
    throw new Error("Invalid email")
  }
  
  var emailTaken = users.some(user => user.email === email);
  //checking if email used
  var usernameTaken = users.some(user => users.username === username);
  //checking if username used

  if (emailTaken) {
    //returning error if email has already taken
    throw new Error("This email has taken");
  };
  if (usernameTaken) {
    //returning error if username has already taken
    throw new Error("This email has taken");
  };

  return {username: args.username, id: uuidv4(), email: args.email,};
  //returning newUser object
};

module.exports = addUser;

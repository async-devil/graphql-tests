import uuidv4 from "uuid/v4";
import { validate as uuidValidate } from 'uuid';
import validator from 'validator';

function addPost(posts, args, users) {
  try {
    //checking if data is existing
    var {
      title,
      body,
      published,
      author
    } = args;
    var data = Object.values(args) //creating array of args valuses
  } catch (e) {
    throw new Error("Invalid data");
  };

  data.forEach((item, i) => {
    //checking if items not empty
    if (typeof item == 'boolean') {
      return;
    }
    if (validator.isEmpty(item)) {
      throw new Error("Invalid data")
    }
  });

  if(!uuidValidate(author)) {
    throw new Error("Invalid data")
  }

  var userExists = users.some(user => user.id == author);
  if (!userExists) {
    throw new Error("User not found")
  }

  return {title, body, published, id: uuidv4(), author};
  //returning newUser object
};

module.exports = addPost;

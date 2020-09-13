const singleElementSearch = require('../modules/searchFunctions/singleElementSearch.js');
const doubleElementSearch = require('../modules/searchFunctions/doubleElementSearch.js');
//const singleMultipleObjectSearch = require('./modules/searchFunctions/singleMultipleObjectSearch.js');

const query = {
  users(parent, args, {
    db
  }, info) {
    return doubleElementSearch(args.searchByID, args.searchByUsername, db.users, 'id', 'username')
  },
  posts(parent, args, {
    db
  }, info) {
    if (args.searchByAuthor != '') {
      var data = singleElementSearch(args.searchByAuthor, db.users, 'username')
      //searching user id by username
      try {
        args.searchByAuthor = data[0].id
        //if found then searchByAuthor redeclaremets into id field
      } catch (e) {
        //else
        return []
      }
    }
    return doubleElementSearch(args.searchByAuthor, args.searchByTitle, db.posts, 'author', 'title')
    //search by author id and post title
  },
  comments(parent, args, {
    db
  }, info) {
    if (args.searchByAuthor != '') {
      var data = singleElementSearch(args.searchByAuthor, db.users, 'username')
      //same id search
      try {
        args.searchByAuthor = data[0].id
      } catch (e) {
        return []
      }
    }
    return doubleElementSearch(args.searchByAuthor, args.searchByBody, db.comments, 'author', 'body')
    //search by author id and comment body
  }
}

export {
  query as default
}

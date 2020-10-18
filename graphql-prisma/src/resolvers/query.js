import singleElementSearch from '../modules/searchFunctions/singleElementSearch';
import doubleElementSearch from '../modules/searchFunctions/doubleElementSearch';

const query = {
  users(parent, args, {
    db,
  }) {
    return doubleElementSearch(args.searchByID, args.searchByUsername, db.users, 'id', 'username');
  },
  posts(parent, args, {
    db,
  }) {
    let { searchByAuthor } = args;
    if (args.searchByAuthor !== '') {
      const data = singleElementSearch(args.searchByAuthor, db.users, 'username');
      // searching user id by username
      if (!data[0].id) {
        return [];
      }
      // if found then searchByAuthor redeclaremets into id field
      searchByAuthor = data[0].id;
    }
    return doubleElementSearch(searchByAuthor, args.searchByTitle, db.posts, 'author', 'title');
    // search by author id and post title
  },
  comments(parent, args, {
    db,
  }) {
    let { searchByAuthor } = args;
    if (args.searchByAuthor !== '') {
      const data = singleElementSearch(args.searchByAuthor, db.users, 'username');
      // same id search
      if (!data[0].id) {
        return [];
      }
      searchByAuthor = data[0].id;
    }
    return doubleElementSearch(searchByAuthor, args.searchByBody, db.comments, 'author', 'body');
    // search by author id and comment body
  },
};

export {
  query as default,
};

class ValueError extends Error {
  constructor(message) {
    super(message)
    this.name = 'ValueError'
  }
}

function search(arg1 = false, arg2 = false, db = false) {
  console.log(`first argument ${arg1}, second argument ${arg2}, data is `, db);

  if (!arg1 && !arg2 && !db) {
    throw new ValueError('Please provide arguments')
  } else if (arg1 && !arg2 && db) {
    try {
      return db.filter((item) => {
        return item.id.toLowerCase().includes(arg1.toLowerCase());
      })
    } catch (e) {
      throw new ValueError('Please provide correct value')
    }
  } else if (!arg1 && arg2 && db) {
    try {
      return db.filter((item) => {
        return item.username.toLowerCase().includes(arg2.toLowerCase());
      })
    } catch (e) {
      throw new ValueError('Please provide correct value')
    }
  } else if (arg1 && arg2 && db) {
    try {
      var filtered = db.filter((item) => {
        return item.id.toLowerCase().includes(arg1.toLowerCase());
      });

      return filtered.filter((item) => {
        return item.username.toLowerCase().includes(arg2.toLowerCase());
      })
    } catch (e) {
      throw new ValueError('Please provide correct value')
    }
  } else if (!arg1 && !arg2 && db) {
    return db
  } else {
    throw new ValueError('Please provide correct value')
  }
}
module.exports = search;

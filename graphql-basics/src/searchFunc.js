class ValueError extends Error {
  constructor(message) {
    super(message)
    this.name = 'ValueError'
  }
}

function search(arg1 = false, arg2 = false, db = false, q1 = false, q2 = false) {
  /*
  arg1, arg2 are value which to search
  db is data where to search
  q1, q2 items of object which are comparing
  */
  //console.log(`first argument ${arg1}, second argument ${arg2}, data is `, db);

  if (!arg1 && !arg2 && !db && !q1 && !q2) {
    throw new ValueError('Please provide arguments')
  } else if (arg1 && !arg2 && db && q1 && q2) {
    try {
      return db.filter((item) => {
        return item[q1].toLowerCase().includes(arg1.toLowerCase()); //search by arg1
      })
    } catch (e) {
      throw new ValueError('Please provide correct value')
    }
  } else if (!arg1 && arg2 && db && q1 && q2) {
    try {
      return db.filter((item) => {
        return item[q2].toLowerCase().includes(arg2.toLowerCase()); //search by arg2
      })
    } catch (e) {
      throw new ValueError('Please provide correct value')
    }
  } else if (arg1 && arg2 && db && q1 && q2) {
    try {
      var filtered = db.filter((item) => {
        return item[q2].toLowerCase().includes(arg2.toLowerCase()); //search by arg2
      });

      return filtered.filter((item) => {
        return item[q1].toLowerCase().includes(arg1.toLowerCase()); //then by arg1
      })
    } catch (e) {
      throw new ValueError('Please provide correct value')
    }
  } else if (!arg1 && !arg2 && db && q1 && q2) {
    return db
  } else {
    throw new ValueError('Please provide correct value')
  }
}
module.exports = search;

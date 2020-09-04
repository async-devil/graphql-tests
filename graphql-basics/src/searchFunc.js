function search(dataToSearch1, dataToSearch2, dataBase, searchObject1, searchObject2) {
  /*
  arg1, arg2 are value which to search
  db is data where to search
  q1, q2 items of object which are comparing
  */
  //console.log(`first argument ${arg1}, second argument ${arg2}, data is `, db);

  if (!dataToSearch1 && !dataToSearch2 && !dataBase && !searchObject1 && !searchObject2) {
    throw new ValueError('Please provide arguments')
  } else if (dataToSearch1 && !dataToSearch2 && dataBase && searchObject1 && searchObject2) {
    try {
      return db.filter((item) => {
        return item[q1].toLowerCase().includes(arg1.toLowerCase()); //search by arg1
      })
    } catch (e) {
      throw new ValueError('Please provide correct value')
    }
  } else if (!dataToSearch1 && dataToSearch2 && dataBase && searchObject1 && searchObject2) {
    try {
      return db.filter((item) => {
        return item[q2].toLowerCase().includes(arg2.toLowerCase()); //search by arg2
      })
    } catch (e) {
      throw new ValueError('Please provide correct value')
    }
  } else if (dataToSearch1 && dataToSearch2 && dataBase && searchObject1 && searchObject2) {
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
  } else if (!dataToSearch1 && !dataToSearch2 && dataBase && searchObject1 && searchObject2) {
    return db
  } else {
    throw new ValueError('Please provide correct value')
  }
}

class SearchFunctions  {
  // constructor(dataToSearch1, dataToSearch2, dataBase, searchObject1, searchObject2){}
  singleElementSearch(dataToSearch, dataBase, searchObject) {
    try {
      return dataBase.filter((item) => {
        return item[searchObject].toLowerCase().includes(dataToSearch.toLowerCase());
      });
    } catch (err) {
      if (!dataToSearch || !dataBase || !searchObject) {
        return false
      }
      return dataBase
    }
  }

  doubleElementSearch(dataToSearch1, dataToSearch2, dataBase, searchObject1, searchObject2) {
    try {
      var filtered = dataBase.filter((item) => {
        return item[searchObject2].toLowerCase().includes(dataToSearch2.toLowerCase()); //search by arg2
      });

      return filtered.filter((item) => {
        return item[searchObject2].toLowerCase().includes(dataToSearch1.toLowerCase()); //then by arg1
      })
    } catch (e) {
      if (!dataToSearch1 || !dataToSearch2 || !dataBase || !searchObject1 || !searchObject2) {
        return false
      }
      return dataBase
    }
  }

  singleMultipleObjectSearch(dataToSearch, dataBase, searchObject1, searchObject2) {
    try {
      return dataBase.filter((item) => {
        return item[searchObject1][searchObject2].toLowerCase().includes(dataToSearch.toLowerCase());
      });
    } catch (err) {
      if (!dataToSearch || !dataBase || !searchObject1 || !searchObject2) {
        return false
      }
      return dataBase
    }
  }

  doubleElementSearch_WithMultipleObject() {}
}

module.exports = search;

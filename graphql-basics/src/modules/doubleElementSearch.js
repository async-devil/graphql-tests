function doubleElementSearch(dataToSearch1, dataToSearch2, dataBase, searchObject1, searchObject2) {
  try {
    var filtered = dataBase.filter((item) => {
      return item[searchObject2].toLowerCase().includes(dataToSearch2.toLowerCase()); //search by arg2
    });
    return filtered.filter((item) => {
      return item[searchObject1].toLowerCase().includes(dataToSearch1.toLowerCase()); //then by arg1
    })
  } catch (e) {
    if (!dataToSearch1 || !dataToSearch2 || !dataBase || !searchObject1 || !searchObject2) {
      return false
    }
    return dataBase
  }
}

module.exports = doubleElementSearch;

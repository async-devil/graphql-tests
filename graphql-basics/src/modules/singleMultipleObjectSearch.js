function singleMultipleObjectSearch(dataToSearch, dataBase, searchObject1, searchObject2) {
  try {
    return dataBase.filter((item) => {
      return item[searchObject1][searchObject2].toLowerCase().includes(dataToSearch.toLowerCase());
    });
  } catch (err) {
    if (!dataToSearch && !dataBase && !searchObject1 && !searchObject2) {
      return false
    }
    return dataBase
  }
}

module.exports = singleMultipleObjectSearch;

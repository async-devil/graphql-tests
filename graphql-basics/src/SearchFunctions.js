class SearchFunctions {
  constructor(dataToSearch, dataToSearch1, dataToSearch2, dataBase, searchObject1, searchObject2) {
    var dataToSearch = this.dataToSearch;
    var dataToSearch1 = this.dataToSearch1;
    var dataToSearch2 = this.dataToSearch2;
    var dataBase = this.dataBase;
    var searchObject1 = this.searchObject1;
    var searchObject2 = this.searchObject2;
  }

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
}

module.exports = SearchFunctions;

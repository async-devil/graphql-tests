function singleElementSearch(dataToSearch, dataBase, searchObject) {
  try {
    return dataBase.filter((item) => {
      const data = item[searchObject];
      return data.toLowerCase().includes(dataToSearch.toLowerCase());
    });
  } catch (err) {
    if (!dataToSearch && !dataBase && !searchObject) {
      return false;
    }
    return dataBase;
  }
}

export { singleElementSearch as default };

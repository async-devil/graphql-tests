function doubleElementSearch(dataToSearch1, dataToSearch2, dataBase, searchObject1, searchObject2) {
  try {
    const filtered = dataBase.filter((item) => {
      const data = item[searchObject2];
      return data.toLowerCase().includes(dataToSearch2.toLowerCase());
      // search by arg2
    });
    return filtered.filter((item) => {
      const data = item[searchObject1];
      return data.toLowerCase().includes(dataToSearch1.toLowerCase());
      // then by arg1
    });
  } catch (e) {
    if (!dataToSearch1 && !dataToSearch2 && !dataBase && !searchObject1 && !searchObject2) {
      return false;
    }
    return dataBase;
  }
}

export { doubleElementSearch as default };

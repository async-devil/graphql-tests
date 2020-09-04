const singleElementSearch = require('./modules/singleElementSearch.js');
const doubleElementSearch = require('./modules/doubleElementSearch.js');
const singleMultipleObjectSearch = require('./modules/singleMultipleObjectSearch.js');

var data = [
  {
    title: 'test',
    author: {
      username: '1'
    }
  }, {
    title: 'a',
    author: {
      username: '2'
    }
  }
]
var filtered = singleMultipleObjectSearch('', data, 'author', 'username')
console.log(singleElementSearch('', filtered, 'title'));

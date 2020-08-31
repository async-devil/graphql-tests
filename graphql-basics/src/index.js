import {GraphQLServer} from 'graphql-yoga'

class ValueError extends Error {
  constructor(message) {
    super(message)
    this.name = 'ValueError'
  }
}

const opts = {
  port: 4001
}

//demo DB
const users = [
  {
    username: 'async-devil',
    id: '#1111',
    email: 'async.devil@gmail.com',
    age: 27
  }, {
    username: 'test_user',
    id: '#1112',
    email: 'test@test.com'
  }, {
    username: 'test_user2',
    id: '#1113',
    email: 'test2@test.com'
  }
]
const posts = [
  {
    heading: 'Test heading',
    body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
    published: true,
    id: 'sdasfbbshdfbkshd',
    author: null,
    comments: null,
    rating: 0
  }, {
    heading: 'Test heading 2',
    body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
    published: true,
    id: '333-111-112',
    author: null,
    comments: null,
    rating: 0
  }
]

//Type definitions

const typeDefs = `
  type Query {
    me: User!
    posts(searchByID: String, searchByName: String): [Post]
    users(searchByID: String, searchByName: String): [User]
  }

  type Product {
    type: String!
    id: ID!
    stock: Int!
    rating: Float!
  }

  type Post {
    heading: String!
    body: String!
    published: Boolean!
    id: ID!
    author: User
    comments: Comment
    rating: Float!
  }

  type Comment {
    body: String!
    published: Boolean!
    id: ID!
    author: User!
    post: Post!
  }

  type User {
    username: String!
    id: ID!
    email: String!
    products: [Product]
    posts: [Post]
    comments: [Comment]
    age: Int
  }
`

//Resolvers

function search(arg1 = false, arg2 = false, db = false) {
  //console.log(`first argument ${arg1}, second argument ${arg2}, data is `, db);

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

const resolvers = {
  Query: {
    users(parent, args, ctx, info) {
      return search(args.searchByID, args.searchByName, users)
    },
    posts(parent, args, ctx, info) {
      return posts;
    },
    me(parent, args, ctx, info) {
      return {username: 'test', id: '111-111-111', email: 'test@test.com', age: 21}
    }
  }
}

const server = new GraphQLServer({typeDefs, resolvers})
server.start(opts, () => {
  console.log('server started');
})

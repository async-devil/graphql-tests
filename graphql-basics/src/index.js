import {GraphQLServer} from 'graphql-yoga'

//Type definitions

const typeDefs = `
  type Query {
    name: String!
    id: ID!
    published: Boolean!
    gps: Float
  }

  type Product {
    type: String!
    id: ID!
    stock: Int!
    rating: Float!
  }

  type User {
    username: String!
    id: ID!
    email: String!
    products: Product!
    age: Int!
  }
`

//Resolvers

const resolvers = {
  Query: {
    name() {
      return 'Name'
    },
    id() {
      return '111-111-111';
    },
    published() {
      return true;
    },
    gps() {
      return null;
    }
  }
}

const server = new GraphQLServer({typeDefs, resolvers})

server.start(() => {
  console.log('server started');
})

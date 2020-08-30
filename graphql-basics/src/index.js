import {GraphQLServer} from 'graphql-yoga'

//Type definitions

const typeDefs = `
  type Query {
    me: User!
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
    age: Int
  }
`

//Resolvers

const resolvers = {
  Query: {
    me() {
      return {
        username: 'test',
        id: '111-111-111',
        email: 'test@test.com',
        products: {
          type: 'test object',
          id: '222-111-111',
          stock: 2,
          rating: 5.3
        },
        age: 21
      }
    }
  }
}

const server = new GraphQLServer({typeDefs, resolvers})

server.start(() => {
  console.log('server started');
})

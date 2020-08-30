import {GraphQLServer} from 'graphql-yoga'

//Type definitions

const typeDefs = `
  type Query {
    name: String!
    id: Id!
    published: Boolean!
    gps: Float
  }
`

//Resolvers

const resolvers = {
  Query: {
    name() {
      return 'Name'
    }
    id() {
      return '111-111-111';
    }
    published() {
      return true;
    }
    gps() {
      return null;
    }
  }
}

const server = new GraphQLServer({typeDefs, resolvers})

server.start(() => {
  console.log('server started');
})

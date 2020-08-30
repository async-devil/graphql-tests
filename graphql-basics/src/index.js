import {GraphQLServer} from 'graphql-yoga'

//Type definitions

const typeDefs = `
  type Query {
    me: User!
    greeting(name: String): String!
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
    author: User!
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
    products: Product
    posts: [Post]
    comments: [Comment]
    age: Int
  }
`

//Resolvers
const resolvers = {
  Query: {
    greeting() {
      return 'Hi'
    },
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
        posts: [
          {
            heading: 'Test heading',
            body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
            published: true,
            id: '333-111-111',
            //author:
            //comments:
            rating: 0
          }, {
            heading: 'Test heading 2',
            body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
            published: true,
            id: '333-111-112',
            //author:
            //comments:
            rating: 0
          }
        ],
        comments: [
          {
            body: 'Lorem ipsum dolor sit amet',
            published: false,
            id: '444-111-111'
            //author
            //post
          }, {
            body: 'Lorem ipsum dolor sit amet 2',
            published: false,
            id: '444-111-112'
            //author
            //post
          }
        ],
        age: 21
      }
    }
  }
}

const server = new GraphQLServer({typeDefs, resolvers})

server.start(() => {
  console.log('server started');
})

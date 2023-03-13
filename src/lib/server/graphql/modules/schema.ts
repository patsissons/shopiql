import { createModule, gql } from 'graphql-modules'

export const schema = createModule({
  id: 'base',
  typeDefs: gql`
    type Query {
      ping: String
    }

    schema {
      query: Query
    }
  `,
  resolvers: {
    Query: {
      ping() {
        return 'PONG'
      },
    },
  },
})

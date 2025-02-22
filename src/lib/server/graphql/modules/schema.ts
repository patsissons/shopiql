import { createModule, gql } from 'graphql-modules'
import GraphQLJSON, { GraphQLJSONObject } from 'graphql-type-json'

export const schema = createModule({
  id: 'base',
  typeDefs: gql`
    scalar JSON
    scalar JSONObject

    type Query {
      """
      Basic GraphQL health check, returns "PONG"
      """
      ping: String
    }

    schema {
      query: Query
    }
  `,
  resolvers: {
    JSON: GraphQLJSON,
    JSONObject: GraphQLJSONObject,
    Query: {
      ping() {
        return 'PONG'
      },
    },
  },
})

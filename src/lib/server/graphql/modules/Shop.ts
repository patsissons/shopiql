import { createModule, gql } from 'graphql-modules'

export const Shop = createModule({
  id: 'shop',
  typeDefs: gql`
    type Shop {
      id: ID!
      host: String!
    }

    extend type Query {
      shop(domain: String!): Shop
    }
  `,
  resolvers: {
    Query: {
      shop(_source: unknown, { domain }: { domain: string }) {
        const host = domain.startsWith('http')
          ? domain
          : `https://${domain}.myshopify.com`

        return { id: domain, host }
      },
    },
  },
})

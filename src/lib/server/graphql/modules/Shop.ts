import { createModule, gql } from 'graphql-modules'
import type { Context } from '../types'

import { shop } from './resolvers/shop'

export const Shop = createModule({
  id: 'shop',
  typeDefs: gql`
    type Shop {
      id: ID!
      city: String
      currency: String
      description: String
      domain: String!
      moneyFormat: String
      myshopifyDomain: String!
      name: String!
      province: String
      publishedCollectionsCount: Int
      publishedProductsCount: Int
      shipsToCountries: [String!]
      shopify_pay_enabled_card_brands: [String!]
      url: String!
    }

    extend type Query {
      shop(domain: String!): Shop
    }
  `,
  resolvers: {
    Query: {
      shop(_source: unknown, { domain }: { domain: string }, context: Context) {
        return shop(context, domain)
      },
    },
  },
})

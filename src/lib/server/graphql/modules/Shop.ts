import { fetchJson } from '$lib/server/fetchJson'
import { createModule, gql } from 'graphql-modules'
import { endpoints } from '../constants'
import type { Context } from '../types'
import { camelize } from '../utils'

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
      async shop(_source: unknown, args: { domain: string }, context: Context) {
        const url = args.domain.startsWith('http')
          ? args.domain
          : `https://${args.domain}.myshopify.com`
        const endpoint = context.endpoint(endpoints.store.meta, {
          shop: { url },
        })
        const response = await fetchJson(context.fetch, endpoint)
        const shop = camelize<{ url: string }>(response)

        if (!shop.url) shop.url = url
        context.shop = shop

        return shop
      },
    },
  },
})

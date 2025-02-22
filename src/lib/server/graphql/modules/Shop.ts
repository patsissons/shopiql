import { createModule, gql } from 'graphql-modules'
import type { Context } from '../types'

import { shop, rawData } from './resolvers/shop'

export const Shop = createModule({
  id: 'shop',
  typeDefs: gql`
    type Shop {
      id: ID!
      """
      _data emits the raw data payload when loading the shop, may contain additional data that is not captured as a GraphQL field.
      """
      _data: JSONObject!

      """
      _raw is a special field that fetches a raw endpoint payload by its path and format for the current shop.
      """
      _raw(
        """
        the path to the raw endpoint to load. e.g., meta
        """
        path: String!
        """
        The format of the raw endpoint, appended to the path. e.g., json

        - defaults to json
        - use "" to omit the format
        """
        format: String
        """
        Additional URL params to append to the endpoint.
        """
        params: [RawQueryParamInput!]
      ): JSONObject!

      city: String
      country: String
      currency: String
      description: String
      domain: String!
      moneyFormat: String
      myshopifyDomain: String!
      name: String!
      offersShopPayInstallments: Boolean
      province: String
      publishedCollectionsCount: Int
      publishedProductsCount: Int
      shipsToCountries: [String!]
      shopifyPayEnabledCardBrands: [String!]
      url: String!
    }

    input RawQueryParamInput {
      key: String!
      value: String
    }

    extend type Query {
      """
      Loads a shop by its url or myshopify.com subdomain
      """
      shop(
        """
        domain can be a full custom url, a full myshopify.com url, or just the myshopify.com subdomain.

        ## Examples
        - supplystore2021
        - https://supplystore2021.myshopify.com
        - https://checkout.shopify.supply
        """
        domain: String!
      ): Shop
    }
  `,
  resolvers: {
    Query: {
      async shop(
        _source: unknown,
        { domain }: { domain: string },
        context: Context,
      ) {
        const result = await shop(context, domain)
        context.store.shop = result
        return result
      },
    },
    Shop: {
      _data(source: unknown) {
        return source
      },
      _raw(
        _source: unknown,
        {
          path,
          format,
          params: paramsList,
        }: {
          path: string
          format?: string
          params?: { key: string; value?: string }[]
        },
        context: Context,
      ) {
        const params =
          paramsList &&
          Object.fromEntries(paramsList.map(({ key, value }) => [key, value]))
        return rawData(context, path, { format, params })
      },
    },
  },
})

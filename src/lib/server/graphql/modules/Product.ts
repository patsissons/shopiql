import { createModule, gql } from 'graphql-modules'
import { fetchJson } from '$lib/server/fetchJson'
import type { Context } from '../types'
import { camelize } from '../utils'
import { endpoints } from '../constants'

export const Product = createModule({
  id: 'product',
  typeDefs: gql`
    type Product {
      id: ID!
      handle: String!
    }

    type Variant {
      id: ID!
    }

    type Image {
      id: ID!
    }

    type Option {
      name: String!
      position: Int!
      values: [String!]!
    }

    type ShopProduct {
      id: ID!
      title: String!
      handle: String!
      bodyHtml: String!
      publishedAt: String!
      createdAt: String!
      updatedAt: String!
      vendor: String!
      productType: String!
      tags: [String!]!
      variants: [Variant!]!
      images: [Image!]!
      options: [Option!]!
      product: Product!
    }

    extend type Shop {
      products: [ShopProduct!]!
    }
  `,
  resolvers: {
    Shop: {
      async products(
        shop: { domain: string },
        { limit = 10, page }: { limit?: number; page?: number } = {},
        context: Context,
      ) {
        context.shop = shop

        const params = { limit, page }

        const endpoint = context.endpoint(endpoints.product.all, { params })
        const response = await fetchJson(context.fetch, endpoint)

        const { products } = camelize<{ products: unknown[] }>(response)

        return products
      },
    },
    ShopProduct: {
      async product(
        { handle }: { handle: string },
        _args: unknown,
        context: Context,
      ) {
        const endpoint = context.endpoint(endpoints.product.product(handle))
        const response = await fetchJson(context.fetch, endpoint)

        const { product } = camelize<{ product: unknown }>(response)

        return product
      },
    },
  },
})

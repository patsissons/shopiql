import { createModule, gql } from 'graphql-modules'
import { fetchJson } from '$lib/server/fetchJson'
import type { Context } from '../types'
import { camelize } from '../utils'

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
        { host }: { host: string },
        _args: unknown,
        context: Context,
      ) {
        const url = `${host}/products.json`
        const response = await fetchJson(context.fetch, url)

        const { products } = camelize<{ products: unknown[] }>(response)
        context.host = host

        return products
      },
    },
    ShopProduct: {
      async product(
        { handle }: { handle: string },
        _args: unknown,
        context: Context,
      ) {
        if (!context.host) return

        const url = `${context.host}/products/${handle}.json`
        const response = await fetchJson(context.fetch, url)
        const { product } = camelize<{ product: unknown }>(response)

        return product
      },
    },
  },
})

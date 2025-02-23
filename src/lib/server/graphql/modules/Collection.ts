import { createModule, gql } from 'graphql-modules'
import type { Context } from '../types'

import {
  collection,
  collectionProducts,
  collections,
  collectionsProducts,
} from './resolvers/collections'

export const Collection = createModule({
  id: 'collection',
  typeDefs: gql`
    type Collection {
      id: ID!
      """
      _data emits the raw data payload when loading the shop collection, may contain additional data that is not captured as a GraphQL field.
      """
      _data: JSONObject!
      title: String
      handle: String
      description: String
      publishedAt: String
      updatedAt: String
      image: String
      productsCount: Int
      products(limit: Int, page: Int): [ShopProduct!]!
    }

    extend type Shop {
      """
      List of all collections in the shop.
      """
      collections(limit: Int, page: Int): [Collection!]!
      """
      List of all products in all collections.
      """
      collectionsProducts(limit: Int, page: Int): [ShopProduct!]!
      """
      Collection by handle.
      """
      collection(handle: String!): Collection
      """
      List of all products in a collection.
      """
      collectionProducts(
        handle: String!
        limit: Int
        page: Int
      ): [ShopProduct!]!
    }
  `,
  resolvers: {
    Shop: {
      collections(
        _source: unknown,
        { limit = 10, page }: { limit?: number; page?: number } = {},
        context: Context,
      ) {
        return collections(context, limit, page)
      },
      collectionsProducts(
        _source: unknown,
        { limit = 10, page }: { limit?: number; page?: number } = {},
        context: Context,
      ) {
        return collectionsProducts(context, limit, page)
      },
      collection(
        _source: unknown,
        { handle }: { handle: string },
        context: Context,
      ) {
        return collection(context, handle)
      },
      collectionProducts(
        _source: unknown,
        {
          handle,
          limit = 10,
          page,
        }: { handle: string; limit?: number; page?: number },
        context: Context,
      ) {
        return collectionProducts(context, handle, limit, page)
      },
    },
    Collection: {
      _data(source: unknown) {
        return source
      },
      products(
        { handle }: { handle: string },
        { limit = 10, page }: { limit?: number; page?: number },
        context: Context,
      ) {
        return collectionProducts(context, handle, limit, page)
      },
    },
  },
})

import { createModule, gql } from 'graphql-modules'
import type { Context } from '../types'

import { page, pages } from './resolvers/pages'

export const Page = createModule({
  id: 'page',
  typeDefs: gql`
    type Page {
      id: ID!
      """
      _data emits the raw data payload when loading the shop page, may contain additional data that is not captured as a GraphQL field.
      """
      _data: JSONObject!
      title: String
      handle: String
      bodyHtml: String
      createdAt: String
      updatedAt: String
    }

    extend type Shop {
      """
      List of all pages in the shop.
      """
      pages(limit: Int, page: Int): [Page!]!
      """
      Page by handle.
      """
      page(handle: String!): Page
    }
  `,
  resolvers: {
    Shop: {
      pages(
        _source: unknown,
        { limit = 10, page }: { limit?: number; page?: number } = {},
        context: Context,
      ) {
        return pages(context, limit, page)
      },
      page(_source: unknown, { handle }: { handle: string }, context: Context) {
        return page(context, handle)
      },
    },
    Page: {
      _data(source: unknown) {
        return source
      },
    },
  },
})

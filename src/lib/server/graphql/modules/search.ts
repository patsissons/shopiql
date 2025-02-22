import { createModule, gql } from 'graphql-modules'
import type { Context } from '../types'

import { productJs, productJson } from './resolvers/products'
import { suggest } from './resolvers/suggest'

// see: https://shopify.dev/docs/api/ajax/reference/predictive-search#get-locale-search-suggest
export const search = createModule({
  id: 'search',
  typeDefs: gql`
    enum SearchResourceType {
      PRODUCT
      PAGE
      ARTICLE
      COLLECTION
      QUERY
    }

    enum SearchLimitScope {
      ALL
      EACH
    }

    enum SearchUnavailableVisibility {
      SHOW
      HIDE
      LAST
    }

    enum SearchField {
      AUTHOR
      BODY
      PRODUCT_TYPE
      TAG
      TITLE
      VARIANTS_BARCODE
      VARIANTS_SKU
      VARIANTS_TITLE
      VENDOR
    }

    type SearchQueryResult {
      url: String
      text: String
      styledText: String
    }

    type SearchResultFeatureImage {
      alt: String
      aspectRatio: Float
      height: Int
      url: String
      width: Int
    }

    type SearchProductResultVariant {
      id: ID!
      available: Boolean
      compareAtPrice: String
      image: String
      price: String
      title: String
      url: String
      featuredImage: SearchResultFeatureImage
    }

    type SearchProductResult {
      id: ID!
      available: Boolean
      body: String
      compareAtPrice: String
      compareAtPriceMax: String
      compareAtPriceMin: String
      handle: String!
      image: String
      price: String
      priceMax: String
      priceMin: String
      tags: [String!]
      title: String
      type: String
      url: String
      variants: [SearchProductResultVariant!]
      vendor: String
      featuredImage: SearchResultFeatureImage
      productJson: ProductJSON!
      productJs: ProductJS!
    }

    type SearchCollectionResult {
      id: ID!
      handle: String!
      body: String
      featuredImage: SearchResultFeatureImage
      publishedAt: String
      title: String
      url: String
    }

    type SearchPageResult {
      id: ID!
      handle: String!
      author: String
      body: String
      publishedAt: String
      title: String
      url: String
    }

    type SearchArticleResult {
      id: ID!
      handle: String!
      author: String
      body: String
      image: String
      publishedAt: String
      summaryHtml: String
      tags: [String!]
      title: String
      url: String
    }

    type SearchResult {
      _data: JSONObject!
      queries: [SearchQueryResult!]
      products: [SearchProductResult!]
      collections: [SearchCollectionResult!]
      pages: [SearchPageResult!]
      articles: [SearchArticleResult!]
    }

    extend type Shop {
      search(
        query: String!
        types: [SearchResourceType!]
        limit: Int
        limitScope: SearchLimitScope
        unavailableVisibility: SearchUnavailableVisibility
        fields: [SearchField!]
      ): SearchResult!
    }
  `,
  resolvers: {
    Shop: {
      search(
        _source: unknown,
        {
          query,
          ...options
        }: {
          query: string
          types?: string[]
          limit?: number
          limitScope?: string
          unavailableVisibility?: string
          fields?: string[]
        },
        context: Context,
      ) {
        return suggest(context, query, options)
      },
    },
    SearchResult: {
      _data(source: unknown) {
        return source
      },
    },
    SearchProductResult: {
      productJson(
        { handle }: { handle: string },
        _args: unknown,
        context: Context,
      ) {
        return productJson(context, handle)
      },
      productJs(
        { handle }: { handle: string },
        _args: unknown,
        context: Context,
      ) {
        return productJs(context, handle)
      },
    },
  },
})

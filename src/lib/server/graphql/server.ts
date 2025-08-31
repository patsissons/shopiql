import { useGraphQLModules } from '@envelop/graphql-modules'
import { createYoga } from 'graphql-yoga'
import { app } from './app'
import { context } from './context'
import type { Context } from './types'

export const server = createYoga<Context>({
  logging: true,
  fetchAPI: { Response },
  plugins: [useGraphQLModules(app)],
  graphqlEndpoint: '/api/graphql',
  context,
  graphiql: {
    title: 'ShopiQL explorer',
    defaultQuery: `# Welcome to ShopiQL explorer
#
# ShopiQL explorer is an in-browser tool for inspecting the public access data
# of a Shopify store. This is done by sending a request to these public data
# access endpoints
#
# Here is a really basic query to get you started.

query {
  shop(domain: "supplystore2021") {
    id
    name
    description
  }
}

# Type queries into this side of the screen, and you will see intelligent
# typeaheads aware of the current GraphQL type schema and live syntax and
# validation errors highlighted within the text.
#
# Example Queries
#
# always start with a query for the shop and build from there
#
# query {
#   shop(domain: "supplystore2021") {
#     id
#     name
#     description
#   }
# }
#
# we can always add the _data field to any field to see the raw data payload
#
# query {
#   shop(domain: "supplystore2021") {
#     id
#     _data
#   }
# }
#
# we can nest additional fields under the shop to get more specific data about a
# product for example.
#
# query {
#   shop(domain: "supplystore2021") {
#     products(first: 10) {
#       id
#       handle
#       title
#     }
#   }
# }
#
# we can also really deep dive into the data by using the _raw field on a Shop
# to access data that is not yet exposed by the GraphQL schema.
#
# query {
#   shop(domain: "supplystore2021") {
#     _raw(path: "pages")
#   }
# }
#
# Here is a list of all the known endpoints we can interact with:
# - /meta.json
# - /products.json
# - /products/{handle}.json (and /products/{handle}.js)
# - /collections.json
# - /collections/all/products.json
# - /collections/{handle}.json
# - /collections/{handle}/products.json
# - /pages.json
# - /pages/{handle}.json
# - /recommendations/products.json?product_id={product-id}
# - /search/suggest.json?q={query}&resources[type]=product
#
# Some handy keyboard shortcuts:
#
#  Prettify Query:  Shift-Ctrl-P (or press the prettify button above)
#
#     Merge Query:  Shift-Ctrl-M (or press the merge button above)
#
#       Run Query:  Ctrl-Enter (or press the play button above)
#
#   Auto Complete:  Ctrl-Space (or just start typing)
    `,
  },
})

import { useGraphQLModules } from '@envelop/graphql-modules'
import { createYoga } from 'graphql-yoga'
import { app } from './app'
import { context } from './context'
import type { Context } from './types'

export const server = createYoga<Context>({
  logging: true,
  context,
  graphqlEndpoint: '/api/graphql',
  graphiql: {
    title: 'ShopiQL explorer',
  },
  fetchAPI: globalThis,
  plugins: [useGraphQLModules(app)],
})

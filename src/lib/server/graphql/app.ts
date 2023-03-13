import { createApplication } from 'graphql-modules'
import { modules } from './modules'

export const app = createApplication({
  modules,
})

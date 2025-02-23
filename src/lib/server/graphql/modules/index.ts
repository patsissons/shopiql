import { Collection } from './Collection'
import { Page } from './Page'
import { Product } from './Product'
import { schema } from './schema'
import { search } from './search'
import { Shop } from './Shop'

// for more endpoints, see: https://github.com/shapedigital/shopify-resources/wiki/Public-Endpoints
export const modules = [schema, Shop, Product, Collection, Page, search]

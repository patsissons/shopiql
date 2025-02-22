import { fetchJson } from '$lib/server/fetchJson'
import { endpoints } from '../../constants'
import type { Context } from '../../types'
import { camelize } from '../../utils'

export async function collections(
  context: Context,
  limit: number,
  page?: number,
) {
  const params = { limit, page }

  const endpoint = context.endpoint(endpoints.collection.all, { params })
  const response = await fetchJson(context.fetch, endpoint)
  const { collections } = camelize<{ collections: unknown[] }>(response)

  return collections
}

export async function collectionsProducts(
  context: Context,
  limit: number,
  page?: number,
) {
  const params = { limit, page }

  const endpoint = context.endpoint(endpoints.collection.allProducts, {
    params,
  })
  const response = await fetchJson(context.fetch, endpoint)
  const { products } = camelize<{ products: unknown[] }>(response)

  return products
}

export async function collection(context: Context, handle: string) {
  const endpoint = context.endpoint(endpoints.collection.collection(handle))
  const response = await fetchJson(context.fetch, endpoint)

  const { collection } = camelize<{ collection: unknown }>(response)

  return collection
}

export async function collectionProducts(
  context: Context,
  handle: string,
  limit: number,
  page?: number,
) {
  const params = { limit, page }

  const endpoint = context.endpoint(endpoints.collection.products(handle), {
    params,
  })
  const response = await fetchJson(context.fetch, endpoint)
  const { products } = camelize<{ products: unknown[] }>(response)

  return products
}

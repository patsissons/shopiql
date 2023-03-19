import { fetchJson } from '$lib/server/fetchJson'
import { endpoints } from '../../constants'
import type { Context } from '../../types'
import { camelize } from '../../utils'

export async function products(context: Context, limit: number, page?: number) {
  const params = { limit, page }

  const endpoint = context.endpoint(endpoints.product.all, { params })
  const response = await fetchJson(context.fetch, endpoint)

  const { products } = camelize<{ products: unknown[] }>(response)

  return products
}

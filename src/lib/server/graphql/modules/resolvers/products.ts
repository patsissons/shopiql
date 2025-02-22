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

export async function productJson(context: Context, handle: string) {
  const endpoint = context.endpoint(endpoints.product.product(handle))
  const response = await fetchJson(context.fetch, endpoint)

  const { product } = camelize<{ product: unknown }>(response)

  return product
}

export async function productJs(context: Context, handle: string) {
  const endpoint = context.endpoint(endpoints.product.product(handle), {
    format: 'js',
  })
  const response = await fetchJson(context.fetch, endpoint)

  return camelize(response)
}

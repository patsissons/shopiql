import { fetchJson } from '$lib/server/fetchJson'
import { endpoints } from '../../constants'
import type { Context } from '../../types'
import { camelize } from '../../utils'

export async function productJson(context: Context, handle: string) {
  const endpoint = context.endpoint(endpoints.product.product(handle))
  const response = await fetchJson(context.fetch, endpoint)

  const { product } = camelize<{ product: unknown }>(response)

  return product
}

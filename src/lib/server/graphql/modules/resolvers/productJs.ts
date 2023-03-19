import { fetchJson } from '$lib/server/fetchJson'
import { endpoints } from '../../constants'
import type { Context } from '../../types'
import { camelize } from '../../utils'

export async function productJs(context: Context, handle: string) {
  const endpoint = context.endpoint(endpoints.product.product(handle), {
    format: 'js',
  })
  const response = await fetchJson(context.fetch, endpoint)

  return camelize(response)
}

import { fetchJson } from '$lib/server/fetchJson'
import { endpoints } from '../../constants'
import type { Context } from '../../types'
import { camelize } from '../../utils'

export async function shop(context: Context, domain: string) {
  const url = domain.startsWith('http')
    ? domain
    : `https://${domain.replace('.myshopify.com', '')}.myshopify.com`
  const endpoint = context.endpoint(endpoints.store.meta, {
    shop: { url },
  })
  const response = await fetchJson(context.fetch, endpoint)
  const shop = camelize<{ url: string }>(response)

  if (!shop.url) shop.url = url
  context.store.shop = shop

  return shop
}

export async function rawData(
  context: Context,
  path: string,
  options: { format?: string; params?: Record<string, unknown> },
) {
  const endpoint = context.endpoint(path, options)
  const response = await fetchJson(context.fetch, endpoint).catch((error) => ({
    error,
  }))
  return response
}

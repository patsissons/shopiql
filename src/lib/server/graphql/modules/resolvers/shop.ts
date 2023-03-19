import { fetchJson } from '$lib/server/fetchJson'
import { endpoints } from '../../constants'
import type { Context } from '../../types'
import { camelize } from '../../utils'

export async function shop(context: Context, domain: string) {
  const url = domain.startsWith('http')
    ? domain
    : `https://${domain}.myshopify.com`
  const endpoint = context.endpoint(endpoints.store.meta, {
    shop: { url },
  })
  const response = await fetchJson(context.fetch, endpoint)
  const shop = camelize<{ url: string }>(response)

  if (!shop.url) shop.url = url
  context.shop = shop

  return shop
}

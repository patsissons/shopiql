import { fetchJson } from '$lib/server/fetchJson'
import { endpoints } from '../../constants'
import type { Context } from '../../types'
import { camelize } from '../../utils'

export async function pages(context: Context, limit: number, page?: number) {
  const params = { limit, page }

  const endpoint = context.endpoint(endpoints.pages.all, { params })
  const response = await fetchJson(context.fetch, endpoint)
  const { pages } = camelize<{ pages: unknown[] }>(response)

  return pages
}

export async function page(context: Context, handle: string) {
  const endpoint = context.endpoint(endpoints.pages.page(handle))
  const response = await fetchJson(context.fetch, endpoint)

  const { page } = camelize<{ page: unknown }>(response)

  return page
}

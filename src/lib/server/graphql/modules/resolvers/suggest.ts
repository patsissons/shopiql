import { fetchJson } from '$lib/server/fetchJson'
import { endpoints } from '../../constants'
import type { Context } from '../../types'
import { camelize } from '../../utils'

export async function suggest(
  context: Context,
  query: string,
  {
    types,
    limit,
    limitScope,
    unavailableVisibility,
    fields,
  }: {
    types?: string[]
    limit?: number
    limitScope?: string
    unavailableVisibility?: string
    fields?: string[]
  },
) {
  const params = {
    q: query,
    'resources[type]': types?.map((type) => type.toLowerCase()).join(','),
    'resources[limit]': limit,
    'resources[limit_scope]': limitScope?.toLowerCase(),
    'resources[options][unavailable_products]':
      unavailableVisibility?.toLowerCase(),
    'resources[options][fields]': fields?.map((field) =>
      field.startsWith('variants')
        ? field.split('_').join('.').toLowerCase()
        : field.toLowerCase(),
    ),
  }

  const endpoint = context.endpoint(endpoints.search.suggest, { params })
  const response = await fetchJson(context.fetch, endpoint)

  const {
    resources: { results },
  } = camelize<{ resources: { results: unknown } }>(response)

  return results
}

import type { RequestEvent } from '@sveltejs/kit'
import type { Context } from './types'

export function context(event: RequestEvent): Context {
  return {
    ...event,
    endpoint(this: Context, path, { format = 'json', shop, params } = {}) {
      const domain = shop?.domain || this.shop?.domain
      if (!domain) throw new Error('shop domain missing from context')

      const urlParams =
        params && new URLSearchParams(params as Record<string, string>)
      const url = new URL([path, format].join('.'), domain)

      if (!urlParams) return url.toString()

      return [url, urlParams].join('?')
    },
  }
}

import type { RequestEvent } from '@sveltejs/kit'
import omitBy from 'lodash/omitBy'
import isNil from 'lodash/isNil'
import type { Context } from './types'

export function context(event: RequestEvent): Context {
  return {
    ...event,
    endpoint(this: Context, path, { format = 'json', shop, params } = {}) {
      const baseUrl = shop?.url || this.shop?.url
      if (!baseUrl) throw new Error('shop base url missing from context')

      const urlParams =
        params &&
        new URLSearchParams(omitBy(params as Record<string, string>, isNil))
      const url = new URL([path, format].join('.'), baseUrl)

      if (!urlParams) return url.toString()

      return [url, urlParams].join('?')
    },
  }
}

import type { RequestEvent } from '@sveltejs/kit'
import type { Context } from './types'

export function context(event: RequestEvent): Context {
  return { ...event, host: '' }
}

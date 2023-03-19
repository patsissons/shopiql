import type {
  IResolvers,
  ISchemaLevelResolver,
  MaybePromise,
} from '@graphql-tools/utils'
import type { RequestEvent } from '@sveltejs/kit'

export type Context = RequestEvent & {
  shop?: { url: string }
  endpoint(
    path: string,
    options?: {
      format?: string
      shop?: { url: string }
      params?: Record<string, unknown>
    },
  ): string
}
export type Resolvers<Source = unknown> = IResolvers<Source, Context>
export type Resolver<
  Args = unknown,
  Return = unknown,
  Source = unknown,
> = ISchemaLevelResolver<Source, Context, Args, MaybePromise<Return>>

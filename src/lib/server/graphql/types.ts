import type {
  IResolvers,
  ISchemaLevelResolver,
  MaybePromise,
} from '@graphql-tools/utils'
import type { RequestEvent } from '@sveltejs/kit'

export type Context = RequestEvent & { host: string }
export type Resolvers<Source = unknown> = IResolvers<Source, Context>
export type Resolver<
  Args = unknown,
  Return = unknown,
  Source = unknown,
> = ISchemaLevelResolver<Source, Context, Args, MaybePromise<Return>>

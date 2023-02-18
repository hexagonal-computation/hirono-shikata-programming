type Identity<T> = { [P in keyof T]: T[P] }
export type Replace<T, K extends keyof T, TReplace> = Identity<
  Pick<T, Exclude<keyof T, K>> & {
    [P in K]: TReplace
  }
>

export type UnwrapNull<T> = T extends null ? never : T

export type UnwrapUndefined<T extends string | undefined> = T extends undefined
  ? never
  : T

export type MakeOptional<Type, Key extends keyof Type> = Omit<Type, Key> &
  Partial<Pick<Type, Key>>

export type MakeNullable<Type, Key extends keyof Type> = Omit<Type, Key> & {
  [P in Key]: Type[P] | null
}

export type MakeNonNullable<Type, Key extends keyof Type> = Omit<Type, Key> & {
  [P in Key]: NonNullable<Type[P]>
}

export type Awaited<T> = T extends Promise<infer R> ? Awaited<R> : T

export const isKeyContained = <TObj extends object, TKey extends keyof TObj>(
  obj: TObj,
  key: string | number | symbol,
): key is TKey => {
  return key in obj
}

export const isString = (obj: unknown): obj is string => {
  return !!obj && typeof obj === 'string'
}

export const isArray = (obj: unknown): obj is unknown[] => {
  return !!obj && typeof obj == 'object' && Array.isArray(obj)
}

export const assertNever = (_value: never): never => {
  throw new Error()
}

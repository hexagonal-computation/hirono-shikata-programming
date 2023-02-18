export const excludeNull = <T>(array: (T | null | undefined)[]): T[] => {
  return array.filter((e: T | null | undefined): e is T => !!e)
}

export const all = <T>(
  iterable: Iterable<T>,
  predict: (e: T, index: number) => boolean,
): boolean => {
  return Array.from(iterable).reduce<boolean>(
    (prev, e, i) => prev && predict(e, i),
    true,
  )
}

export const any = <T>(
  iterable: Iterable<T>,
  predict: (e: T, index: number) => boolean,
): boolean => {
  for (const [i, e] of Array.from(iterable).entries()) {
    if (predict(e, i)) {
      return true
    }
  }

  return false
}

const sortByComparableValue = <T>(a: T, b: T, order: 'asc' | 'desc') => {
  if (a > b) {
    return order === 'asc' ? 1 : -1
  }

  if (a < b) {
    return order === 'asc' ? -1 : 1
  }

  return 0
}

export const sortByStringValue = (
  a: string,
  b: string,
  order: 'asc' | 'desc',
) => sortByComparableValue(a, b, order)

export const sortByNumberValue = (
  a: number,
  b: number,
  order: 'asc' | 'desc',
) => sortByComparableValue(a, b, order)

export const sortByBooleanValue = (
  a: boolean,
  b: boolean,
  order: 'asc' | 'desc',
) => {
  if (!a && b) {
    return order === 'asc' ? 1 : -1
  }

  if (a && !b) {
    return order === 'asc' ? -1 : 1
  }

  return 0
}

export const areArraysEqual = <T>(a: T[], b: T[], ignoreOrder: boolean) => {
  if (a.length !== b.length) {
    return false
  }

  if (ignoreOrder) {
    return all(a, (e) => any(b, (target) => e === target))
  } else {
    return all(a, (source, index) => source === b[index])
  }
}

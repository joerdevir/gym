export function arrayToMap<S, A, V>(array: A[], keyFn: (item: A) => S, valueFn: (item: A) => V): Map<S, V>

export function arrayToMap<S, A>(array: A[], keyFn: (item: A) => S): Map<S, A>

export function arrayToMap<S, A, V>(array: A[], keyFn: (item: A) => S, valueFn?: (item: A) => V): Map<S, A | V> {
  const map = new Map<S, A | V>()

  if (valueFn) {
    for (let i = 0; i < array.length; i++) {
      map.set(keyFn(array[i]), valueFn(array[i]))
    }
  } else {
    for (let i = 0; i < array.length; i++) {
      map.set(keyFn(array[i]), array[i])
    }
  }

  return map
}

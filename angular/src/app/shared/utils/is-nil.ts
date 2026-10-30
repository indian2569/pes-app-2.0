/** Typed replacement of lodash isNil: true for null and undefined, and narrows the type for the compiler. */
export function isNil<T>(value: T | null | undefined): value is null | undefined {
  return value === null || value === undefined;
}

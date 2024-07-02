// type AnyFn = (...args: unknown[]) => unknown
type ClassProperties<C> = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  [Key in keyof C as C[Key] extends Function ? never : Key]: C[Key]
}
export interface CompositeProperty<T> {
  property: keyof ClassProperties<T>
  value: T[keyof T]
}
export default interface GetByPropertyRepositoryInterface<T> {
  getByProperty(...input: CompositeProperty<T>[]): Promise<T[] | undefined>
}

export interface CompositeProperty<T, K extends keyof T, V extends T[K]> {
  property: K
  value: V
}
export default interface GetByPropertyRepositoryInterface<T> {
  getByProperty(
    ...input: CompositeProperty<T, keyof T, T[keyof T]>[]
  ): Promise<T | undefined>
}

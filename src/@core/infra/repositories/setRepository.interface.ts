export default interface SetRepositoryInterface<T> {
  set(input: T): Promise<void>
}

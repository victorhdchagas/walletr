export default interface SetRepositoryInterface<T> {
  set(data: T): Promise<void>
}

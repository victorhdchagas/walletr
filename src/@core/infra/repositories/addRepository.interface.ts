export default interface AddRepositoryInterface<T> {
  add(data: T): Promise<void>
}

export default interface AddRepositoryInterface<T> {
  add(input: T): Promise<void>
}

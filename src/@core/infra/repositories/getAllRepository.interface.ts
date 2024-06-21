export default interface GetAllRepositoryInterface<T> {
  getAll(): Promise<T[]>
}

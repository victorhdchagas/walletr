export default interface SyncStorageInterfaceRepository<
  T extends { id?: string | number },
> {
  add(data: T): void
  get(properties: T['id']): T | undefined
  getAll(): T[]
  set(data: T): void
  remove(key: T['id']): void
}

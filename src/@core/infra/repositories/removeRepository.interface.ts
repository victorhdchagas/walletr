export default interface RemoveRepositoryInterface<
  T extends { id?: string | number },
> {
  remove(key: T['id']): Promise<void>
}

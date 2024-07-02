export default interface RemoveRepositoryInterface<
  T extends { id?: string | number },
> {
  remove(input: T['id']): Promise<void>
}

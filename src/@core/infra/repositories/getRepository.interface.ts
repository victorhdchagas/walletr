export default interface GetRepositoryInterface<
  T extends { id?: string | number },
> {
  get(properties: T['id']): Promise<T | undefined>
}

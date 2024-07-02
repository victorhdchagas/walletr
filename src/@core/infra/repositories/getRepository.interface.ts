export default interface GetRepositoryInterface<
  T extends { id?: string | number },
> {
  get(input: T['id']): Promise<T | undefined>
}

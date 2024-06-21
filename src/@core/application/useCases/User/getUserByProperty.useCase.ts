import User from '@core/domain/entities/User.entity'
import UserLocalStorageAsyncRepositoryInterface from '@core/infra/repositories/User/userLocalStorageAsync.repository'

export default class getUserByPropertyUseCase {
  constructor(
    private readonly repo: UserLocalStorageAsyncRepositoryInterface<User>,
  ) {}

  execute(property: keyof User, value: string) {
    return this.repo.getByProperty({ property, value })
  }
}

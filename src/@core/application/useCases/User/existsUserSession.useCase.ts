import User from '@core/domain/entities/User.entity'
import UserLocalStorageAsyncRepositoryInterface from '@core/infra/repositories/User/userLocalStorageAsync.repository'

export default class existsUserSessionUseCase {
  constructor(
    private readonly repo: UserLocalStorageAsyncRepositoryInterface<User>,
  ) {}

  execute(token?: string) {
    return this.repo.getByProperty({ property: 'email', value: token })
  }
}

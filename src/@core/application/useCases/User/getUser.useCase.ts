import User from '@core/domain/entities/User.entity'
import UserLocalStorageAsyncRepositoryInterface from '@core/infra/repositories/User/userLocalStorageAsync.repository'

export default class GetUserUseCase {
  constructor(
    private readonly repository: UserLocalStorageAsyncRepositoryInterface<User>,
  ) {}

  execute(data: string) {
    return this.repository.get(data)
  }
}

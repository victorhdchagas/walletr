import User from '@core/domain/entities/User.entity'
import UserLocalStorageAsyncRepositoryInterface from '@core/infra/repositories/User/userLocalStorageAsync.repository'

export default class CreateUserUseCase {
  constructor(
    private readonly repository: UserLocalStorageAsyncRepositoryInterface<User>,
  ) {}

  async execute(email: string) {
    const user = new User(crypto.randomUUID(), email)
    return this.repository.add(user)
  }
}

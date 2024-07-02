import User from '@core/domain/entities/User.entity'
import SessionAsyncRepositoryInterface from '@core/infra/repositories/Session/SessionAsyncRepository.interface'
import UserLocalStorageAsyncRepositoryInterface from '@core/infra/repositories/User/userLocalStorageAsync.repository'

export default class AuthenticateUserUseCase {
  constructor(
    private readonly repository: SessionAsyncRepositoryInterface,
    private readonly userRepo: UserLocalStorageAsyncRepositoryInterface<User>,
  ) {}

  async execute(email: string) {
    const user = await this.userRepo.getByProperty({
      property: 'email',
      value: email,
    })
    if (!user || user.length !== 1) throw new Error('User not found')

    return this.repository.create({ userId: user[0].id })
  }
}

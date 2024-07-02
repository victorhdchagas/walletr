import User from '@core/domain/entities/User.entity'
import SessionAsyncRepositoryInterface from '@core/infra/repositories/Session/SessionAsyncRepository.interface'
import UserLocalStorageAsyncRepositoryInterface from '@core/infra/repositories/User/userLocalStorageAsync.repository'

export default class GetAuthenticatedUserUseCase {
  constructor(
    private readonly sessionRepo: SessionAsyncRepositoryInterface,
    private readonly userRepo: UserLocalStorageAsyncRepositoryInterface<User>,
  ) {}

  async execute(input: string): Promise<User | null> {
    if (!input) return null
    const session = await this.sessionRepo.getSession(input)

    if (!session) return null

    const user = await this.userRepo.get(session.userId)
    return user || null
  }
}

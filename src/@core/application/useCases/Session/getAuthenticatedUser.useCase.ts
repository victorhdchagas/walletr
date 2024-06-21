import User from '@core/domain/entities/User.entity'
import SessionLocalAsyncRepository from '@core/infra/repositories/Session/SessionLocalAsync.repository'
import UserLocalStorageAsyncRepositoryInterface from '@core/infra/repositories/User/userLocalStorageAsync.repository'

export default class GetAuthenticatedUserUseCase {
  constructor(
    private readonly sessionRepo: SessionLocalAsyncRepository,
    private readonly userRepo: UserLocalStorageAsyncRepositoryInterface<User>,
  ) {}

  async execute(): Promise<User | null> {
    const session = await this.sessionRepo.getSession()
    if (!session) return null

    const user = await this.userRepo.get(session.userId)
    return user || null
  }
}

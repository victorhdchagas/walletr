import SessionAsyncRepositoryInterface from '@core/infra/repositories/Session/SessionAsyncRepository.interface'

export default class SessionIsValidUserUseCase {
  constructor(private readonly repository: SessionAsyncRepositoryInterface) {}

  async execute(email: string) {
    return this.repository.isValid(email)
  }
}

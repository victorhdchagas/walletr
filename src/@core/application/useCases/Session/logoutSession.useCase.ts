import SessionAsyncRepositoryInterface from '@core/infra/repositories/Session/SessionAsyncRepository.interface'

export default class LogoutSessionUseCase {
  constructor(private readonly repository: SessionAsyncRepositoryInterface) {}

  async execute() {
    return this.repository.remove('')
  }
}

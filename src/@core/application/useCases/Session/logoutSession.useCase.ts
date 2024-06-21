import SessionLocalAsyncRepository from '@core/infra/repositories/Session/SessionLocalAsync.repository'

export default class LogoutSessionUseCase {
  constructor(private readonly repository: SessionLocalAsyncRepository) {}

  async execute() {
    return this.repository.remove()
  }
}

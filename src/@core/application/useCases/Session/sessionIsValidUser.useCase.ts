import SessionLocalAsyncRepository from '@core/infra/repositories/Session/SessionLocalAsync.repository'

export default class SessionIsValidUserUseCase {
  constructor(private readonly repository: SessionLocalAsyncRepository) {}

  async execute(email: string) {
    return this.repository.isValid(email)
  }
}

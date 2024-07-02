import PersonRepositoryInterface from '@core/infra/repositories/Person/personrepository.interface'

export default class GetAllPersonsUseCase {
  constructor(private readonly repository: PersonRepositoryInterface) {}

  async execute() {
    return await this.repository.getAll()
  }
}

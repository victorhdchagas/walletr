import PersonRepositoryInterface from '@core/infra/repositories/Person/personrepository.interface'

export default class SearchPersonsByNameUseCase {
  constructor(private readonly repository: PersonRepositoryInterface) {}

  async execute(input: string) {
    return await this.repository.getByProperty({
      property: 'name',
      value: input,
    })
  }
}

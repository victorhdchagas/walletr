import Person from '@core/domain/entities/Person.entity'
import PersonRepositoryInterface from '@core/infra/repositories/Person/personrepository.interface'

export default class GetOrCreatePersonsByNameUseCase {
  constructor(private readonly repository: PersonRepositoryInterface) {}

  async execute(input: string) {
    const result = await this.repository.getByProperty({
      property: 'name',
      value: input,
    })

    if (result && result.length > 0) return result[0]

    const person = Person.createInstance(input)
    await this.repository.add(person)
    return person
  }
}

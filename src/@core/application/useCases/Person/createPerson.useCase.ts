import Person from '@core/domain/entities/Person.entity'
import PersonRepositoryInterface from '@core/infra/repositories/Person/personrepository.interface'

export default class CreatePersonsUseCase {
  constructor(private readonly repository: PersonRepositoryInterface) {}

  async execute(input: string) {
    if (!input) throw new Error('Person name is required')

    const person = Person.createInstance(input)
    await this.repository.add(person)
    return person
  }
}

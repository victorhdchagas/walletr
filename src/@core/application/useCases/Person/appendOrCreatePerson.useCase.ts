import Person from '@core/domain/entities/Person.entity'
import PersonRepositoryInterface from '@core/infra/repositories/Person/personrepository.interface'

export default class AppendOrCreatePersonsUseCase {
  constructor(private readonly repository: PersonRepositoryInterface) {}

  async execute(name: string, id?: string) {
    if (!id) {
      const existsPerson = await this.repository.getByName(name)
      if (existsPerson && existsPerson.length > 0) return existsPerson[0]
      const person = Person.createInstance(name)
      await this.repository.add(person)
      return person
    } else {
      const personFromRepo = await this.repository.get(id)
      if (!personFromRepo) throw new Error('Person not found')
      await this.repository.set(personFromRepo)
      return personFromRepo
    }
  }
}

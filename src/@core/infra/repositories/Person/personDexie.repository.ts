import Person from '@core/domain/entities/Person.entity'
import PersonRepositoryInterface from './personrepository.interface'
import { CompositeProperty } from '../getByPropertyRepository.interface'
import OfflineDatabase from '@core/infra/database/offlinedatabase.database'

export default class PersonDexieRepository
  implements PersonRepositoryInterface
{
  database!: OfflineDatabase
  constructor() {
    this.database = new OfflineDatabase()
  }
  async getByName(name: string): Promise<Person[] | undefined> {
    return await this.database.persons
      .where('name')
      .equalsIgnoreCase(name)
      .toArray()
  }
  async getAll(): Promise<Person[]> {
    return this.database.persons.toArray()
  }
  async add(input: Person): Promise<void> {
    console.log('input')
    await this.database.persons.add(input)
    return
  }
  async get(
    input: string,
  ): Promise<(Person & { id?: string | number | undefined }) | undefined> {
    return await this.database.persons.get(input)
  }
  async getByProperty(
    ...input: CompositeProperty<Person>[]
  ): Promise<Person[] | undefined> {
    const query: Partial<Person> = {}
    input.forEach((inputItem) => {
      query[inputItem.property] = inputItem.value
    })
    return await this.database.persons.where(query).toArray()
  }
  async set(input: Person): Promise<void> {
    await this.database.persons.update(input.id, input)
    return
  }
  async remove(input: string): Promise<void> {
    return await this.database.persons.delete(input)
  }
}

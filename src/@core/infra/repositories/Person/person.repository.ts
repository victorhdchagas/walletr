import Person from '@core/domain/entities/Person.entity'
import PersonRepositoryInterface from './personrepository.interface'
import { CompositeProperty } from '../getByPropertyRepository.interface'

export default class PersonLocalStorageRepository
  implements PersonRepositoryInterface
{
  async getAll(): Promise<Person[]> {
    const data = localStorage.getItem(this.key)
    if (!data) return []
    return (JSON.parse(data) as Person[]).map((person: Person) => {
      return new Person(person.id, person.name)
    })
  }
  key = 'PERSONS_KEY'
  async add(input: Person): Promise<void> {
    const data = await this.getAll()
    data.push(input)
    localStorage.setItem(this.key, JSON.stringify(data))
  }
  async get(
    input: string,
  ): Promise<(Person & { id?: string | number | undefined }) | undefined> {
    const data = await this.getAll()
    return data.find((person) => person.id === input)
  }
  async getByProperty(
    ...input: CompositeProperty<Person>[]
  ): Promise<Person[] | undefined> {
    const data = localStorage.getItem(this.key)
    if (!data) return undefined
    return JSON.parse(data).filter(
      (person: Person) =>
        input.filter((inputItem) =>
          person[inputItem.property].includes(inputItem.value),
        ).length === input.length,
    )
  }
  async set(input: Person): Promise<void> {
    const data = await this.getAll()
    const index = data.findIndex((person) => person.id === input.id)
    data[index] = input
    localStorage.setItem(this.key, JSON.stringify(data))
  }
  async remove(input: string): Promise<void> {
    const data = await this.getAll()
    const index = data.findIndex((person) => person.id === input)
    localStorage.setItem(this.key, JSON.stringify(data.splice(index, 1)))
  }
}

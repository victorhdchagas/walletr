import User from '@core/domain/entities/User.entity'
import { CompositeProperty } from '../getByPropertyRepository.interface'
import UserLocalStorageAsyncRepositoryInterface from './userLocalStorageAsync.repository'

export default class UserLocalRepository
  implements UserLocalStorageAsyncRepositoryInterface<User>
{
  async getByProperty(
    ...input: CompositeProperty<User>[]
  ): Promise<User[] | undefined> {
    const data = localStorage.getItem(this.key)
    if (!data) return undefined
    return JSON.parse(data).find(
      (user: User) =>
        input.filter(
          (inputItem) => user[inputItem.property] === inputItem.value,
        ).length === input.length,
    )
  }

  key = 'USERS_KEY'
  async add(data: User): Promise<void> {
    const toAppend = await this.getAll()
    toAppend.push(data)
    localStorage.setItem(this.key, JSON.stringify(toAppend))
  }
  async get(key: string): Promise<User | undefined> {
    const data = localStorage.getItem(this.key)
    if (!data) return undefined
    return JSON.parse(data).find((user: User) => user.id === key)
  }
  async getAll(): Promise<User[]> {
    const data = localStorage.getItem(this.key)
    if (!data) return []
    return JSON.parse(data)
  }
  async set(data: User): Promise<void> {
    const fullUser = await this.getAll()
    const index = fullUser.findIndex((user: User) => user.id === data.id)
    fullUser[index] = data
    localStorage.setItem(this.key, JSON.stringify(fullUser))
    return
  }
  async remove(key: string): Promise<void> {
    const fullUsers = await this.getAll()
    const index = fullUsers.findIndex((user: User) => user.id === key)
    fullUsers.splice(index, 1)
    localStorage.setItem(this.key, JSON.stringify(fullUsers))
  }
}

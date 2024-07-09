import User from '@core/domain/entities/User.entity'
import UserLocalStorageAsyncRepositoryInterface from './userLocalStorageAsync.repository'
import { CompositeProperty } from '../getByPropertyRepository.interface'
import OfflineDatabase from '@core/infra/database/offlinedatabase.database'

export default class UserDexieRepository
  implements UserLocalStorageAsyncRepositoryInterface<User>
{
  database!: OfflineDatabase
  key = 'USERS_KEY'
  /**
   *
   */
  constructor() {
    this.database = new OfflineDatabase()
  }
  async getByProperty(
    ...input: CompositeProperty<User>[]
  ): Promise<User[] | undefined> {
    return await this.database.users
      .where({ email: input[0].value })
      .toArray()
      .then((ret) => {
        return ret
      })
  }
  async add(data: User): Promise<void> {
    this.database.users.add(data)
  }
  async get(key: string): Promise<User | undefined> {
    return this.database.users.get(key)
  }
  async getAll(): Promise<User[]> {
    return this.database.users.toArray()
  }
  async set(data: User): Promise<void> {
    this.database.users.update(data.id, data)
  }
  async remove(key: string): Promise<void> {
    this.database.users.delete(key)
  }
}

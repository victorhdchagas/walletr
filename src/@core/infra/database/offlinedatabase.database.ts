import Person from '@core/domain/entities/Person.entity'
import Transaction from '@core/domain/entities/Transaction.entity'
import Wallet from '@core/domain/entities/Wallet.entity'
import Dexie, { EntityTable } from 'dexie'
import packageJson from '../../../../package.json'
import User from '@core/domain/entities/User.entity'
import Session from '@core/domain/entities/Session.entity'

export default class OfflineDatabase extends Dexie {
  wallets!: EntityTable<Wallet, 'id'>
  transactions!: EntityTable<Transaction, 'id'>
  persons!: EntityTable<Person, 'id'>
  users!: EntityTable<User, 'id'>
  sessions!: EntityTable<Session, 'id'>
  /**
   *
   */
  constructor() {
    super(packageJson.name)
    this.version(Number(packageJson.version.replace(/\./g, ''))).stores({
      wallets: 'id, name, createdAt, userId, transactions, &balance',
      transactions:
        'id, walletId, name, targetId, description, createdAt, updatedAt',
      persons: 'id, name, createdAt',
      users: 'id, name, createdAt, &email',
      sessions: 'id,token,createdAt,userId',
    })
  }
}

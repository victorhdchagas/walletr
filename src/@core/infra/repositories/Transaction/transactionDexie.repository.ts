import Transaction from '@core/domain/entities/Transaction.entity'
import TransactionRepositoryInterface from './transactionrepository.interface'
import OfflineDatabase from '@core/infra/database/offlinedatabase.database'

export default class TransactionDexieRepository
  implements TransactionRepositoryInterface
{
  database!: OfflineDatabase
  /**
   *
   */
  constructor() {
    this.database = new OfflineDatabase()
  }
  get(id: string): Promise<Transaction | undefined> {
    return this.database.transactions.get(id)
  }
  async update(id: string, transaction: Partial<Transaction>): Promise<void> {
    this.database.transactions.update(id, transaction)
  }
  async getByWalletId(walletId: string): Promise<Transaction[]> {
    return this.database.transactions.where({ walletId }).toArray()
  }
  async create(transaction: Transaction): Promise<void> {
    this.database.transactions.add(transaction)
  }
  async remove(transactionId: string): Promise<void> {
    this.database.transactions.delete(transactionId)
  }
}

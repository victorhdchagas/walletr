import Wallet from '@core/domain/entities/Wallet.entity'
import WalletAsyncRepositoryInterface from './WalletAsyncRepository.interface'
import Transaction from '@core/domain/entities/Transaction.entity'
import { CompositeProperty } from '../getByPropertyRepository.interface'
import OfflineDatabase from '@core/infra/database/offlinedatabase.database'

export default class WalletDexieRepository
  implements WalletAsyncRepositoryInterface
{
  database!: OfflineDatabase
  constructor() {
    this.database = new OfflineDatabase()
  }
  async getByProperty(
    ...input: CompositeProperty<Wallet>[]
  ): Promise<Wallet[] | undefined> {
    const query: Partial<Wallet> = {}
    input.forEach((inputItem) => {
      if (inputItem.property !== 'balance')
        // @ts-expect-error complex type
        query[inputItem.property] = inputItem.value
    })

    const toReturn = await this.database.wallets.where(query).toArray()
    const transactions = await this.database.transactions
      .where('walletId')
      .anyOf(toReturn.map((w) => w.id))
      .toArray()

    return toReturn.map((wallet) => {
      return new Wallet(
        wallet.id,
        wallet.name,
        wallet.userId,
        transactions.filter(
          (transaction) => transaction.walletId === wallet.id,
        ),
        wallet.createdAt,
        wallet.updatedAt,
      )
      //   wallet.transactions = transactions.filter(
      //     (transaction) => transaction.walletId === wallet.id,
      //   )
      //   return wallet
    })
  }
  async appendTransaction(data: Transaction): Promise<void> {
    // const data = Object.assign({}, _data)
    if (!data || !data.walletId) throw new Error('Invalid transaction')
    const walletStorage = await this.get(data.walletId)
    if (!walletStorage) throw new Error('Wallet not found')
    const transactionIndex = walletStorage.transactions.findIndex(
      (transaction: Transaction) => transaction.id === data.id,
    )
    if (transactionIndex < 0) walletStorage.transactions.push(data)
    else walletStorage.transactions[transactionIndex] = data
    await this.set(walletStorage.id, walletStorage)
  }
  async add(data: Wallet) {
    this.database.wallets.add(data)
  }
  async getAll(): Promise<Wallet[]> {
    return await this.database.wallets.toArray() //.map(this.formatWalletToReturn)
  }
  async get(key: Wallet['id']) {
    const toReturn = await this.database.wallets.get(key)
    if (!toReturn) return undefined
    const transactions = await this.database.transactions
      .where('walletId')
      .equals(toReturn?.id ?? '')
      .toArray()

    return new Wallet(
      toReturn.id,
      toReturn.name,
      toReturn.userId,
      transactions.filter(
        (transaction) => transaction.walletId === toReturn.id,
      ),
      toReturn.createdAt,
      toReturn.updatedAt,
    )
  }
  async set(id: string, data: Partial<Wallet>) {
    // if (!data.id) throw new Error('Invalid wallet')

    await this.database.wallets.update(id, data)
  }
  async remove(key: Wallet['id']) {
    await this.database.wallets.delete(key)
  }
}

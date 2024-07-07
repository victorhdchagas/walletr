import Wallet from '@core/domain/entities/Wallet.entity'
import WalletAsyncRepositoryInterface from './WalletAsyncRepository.interface'
import Transaction from '@core/domain/entities/Transaction.entity'
import { CompositeProperty } from '../getByPropertyRepository.interface'

export default class WalletLocalStorageRepository
  implements WalletAsyncRepositoryInterface
{
  key = 'WALLETS_KEY'
  constructor() {}
  async getByProperty(
    ...input: CompositeProperty<Wallet>[]
  ): Promise<Wallet[] | undefined> {
    const data = localStorage.getItem(this.key)
    if (!data) return undefined
    return JSON.parse(data)
      .map(this.formatWalletToReturn)
      .filter(
        (wallet: Wallet) =>
          input.filter(
            (inputItem) =>
              wallet[inputItem.property].toString().toLowerCase() ===
              inputItem.value.toString().toLowerCase(),
          ).length === input.length,
      )
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
    const toAppend = await this.getAll()
    toAppend.push(data)
    localStorage.setItem(this.key, JSON.stringify(toAppend))
    return
  }
  async getAll(): Promise<Wallet[]> {
    const data = localStorage.getItem(this.key)
    if (!data) return []
    return JSON.parse(data).map(this.formatWalletToReturn)
  }
  async get(key: Wallet['id']) {
    const data = localStorage.getItem(this.key)
    if (!data) return undefined
    return JSON.parse(data)
      .map(this.formatWalletToReturn)
      .map(
        (wallet: Wallet) =>
          new Wallet(
            wallet.id,
            wallet.name,
            wallet.userId,
            wallet.transactions.map(
              (transaction) =>
                new Transaction(
                  transaction.id,
                  transaction.walletId,
                  transaction.name,
                  transaction.price,
                  transaction.targetId,
                  transaction.description,
                  new Date(transaction.createdAt),
                  new Date(transaction.updatedAt),
                ),
            ),
            new Date(wallet.createdAt),
            new Date(wallet.updatedAt),
          ),
      )
      .find((wallet: Wallet) => {
        return wallet.id === key
      })
  }
  async set(id: string, data: Wallet) {
    const fullWallet = await this.getAll()
    const index = fullWallet.findIndex((wallet: Wallet) => wallet.id === id)
    fullWallet[index] = data
    localStorage.setItem(this.key, JSON.stringify(fullWallet))
    return
  }
  async remove(key: Wallet['id']) {
    const fullWallets = await this.getAll()
    const index = fullWallets.findIndex((wallet: Wallet) => wallet.id === key)
    fullWallets.splice(index, 1)
    localStorage.setItem(this.key, JSON.stringify(fullWallets))
  }
  private formatWalletToReturn(wallet: Wallet) {
    return {
      ...wallet,
      //   createdAt: new Date(wallet.createdAt),
      //   updatedAt: new Date(wallet.updatedAt),
      transactions: wallet.transactions.map((transaction: Transaction) => ({
        ...transaction,
        // createdAt: new Date(transaction.createdAt),
        // updatedAt: new Date(transaction.updatedAt),
      })),
    }
  }
}

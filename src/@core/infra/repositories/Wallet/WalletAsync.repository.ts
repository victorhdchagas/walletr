import Wallet from 'src/@core/domain/entities/Wallet.entity'
import WalletAsyncRepositoryInterface from './WalletAsyncRepository.interface'
import Transaction from '@core/domain/entities/Transaction.entity'

export default class WalletLocalStorageRepository
  implements WalletAsyncRepositoryInterface
{
  key = 'WALLETS_KEY'
  constructor() {}
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
    await this.set(walletStorage)
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
    return JSON.parse(data)
  }
  async get(key: Wallet['id']) {
    const data = localStorage.getItem(this.key)
    if (!data) return undefined
    return JSON.parse(data).find((wallet: Wallet) => wallet.id === key)
  }
  async set(data: Wallet) {
    const fullWallet = await this.getAll()
    const index = fullWallet.findIndex(
      (wallet: Wallet) => wallet.id === data.id,
    )
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
}

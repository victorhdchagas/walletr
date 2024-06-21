import Wallet from 'src/@core/domain/entities/Wallet.entity'
import SyncStorageInterface from '../SyncStorageInterface.repository'

export default class WalletLocalStorageRepository
  implements SyncStorageInterface<Wallet>
{
  key = 'WALLETS_KEY'
  constructor() {}
  add(data: Wallet) {
    localStorage.setItem(this.key, JSON.stringify(data))
    return
  }
  getAll() {
    const data = localStorage.getItem(this.key)
    if (!data) return []
    return JSON.parse(data)
  }
  get(key: Wallet['id']) {
    const data = localStorage.getItem(this.key)
    if (!data) return undefined

    return JSON.parse(data).find((wallet: Wallet) => wallet.id === key)
  }
  set(data: Wallet) {
    const fullWallet = this.getAll()
    const index = fullWallet.findIndex(
      (wallet: Wallet) => wallet.id === data.id,
    )
    fullWallet[index] = data
    localStorage.setItem(this.key, JSON.stringify(fullWallet))
    return
  }
  async remove(key: Wallet['id']) {
    const fullWallets = this.getAll()
    const index = fullWallets.findIndex((wallet: Wallet) => wallet.id === key)
    fullWallets.splice(index, 1)
    localStorage.setItem(this.key, JSON.stringify(fullWallets))
  }
}

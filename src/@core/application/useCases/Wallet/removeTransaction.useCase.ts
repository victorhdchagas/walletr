import Wallet from '@core/domain/entities/Wallet.entity'
import AsyncStorageInterfaceRepository from '@core/infra/repositories/asyncStorageRepository.interface'

export default class RemoveTransactionUseCase {
  constructor(
    private readonly repository: AsyncStorageInterfaceRepository<Wallet>,
  ) {}
  async execute(walletId: string, transactionid: string) {
    const wallets = await this.repository.getByProperty({
      property: 'id',
      value: walletId,
    })
    if (!wallets || wallets.length === 0) throw new Error('Wallet not found')
    const wallet = wallets[0]
    const transactionIndex = wallet.transactions.findIndex(
      (transaction) => transaction.id === transactionid,
    )
    if (transactionIndex < 0) throw new Error('Transaction not found')
    wallet.transactions.splice(transactionIndex, 1)
    await this.repository.set(walletId, wallet)
  }
}

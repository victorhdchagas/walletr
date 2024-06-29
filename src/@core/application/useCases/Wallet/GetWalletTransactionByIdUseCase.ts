import Transaction from '@core/domain/entities/Transaction.entity'
import Wallet from '@core/domain/entities/Wallet.entity'
import AsyncStorageInterfaceRepository from '@core/infra/repositories/asyncStorageRepository.interface'

export default class GetWalletTransactionByIdUseCase {
  constructor(
    private readonly repository: AsyncStorageInterfaceRepository<Wallet>,
  ) {}
  async execute(transactionId: string): Promise<Transaction | null> {
    const wallets = await this.repository.getAll()
    let toReturn: Transaction | null = null
    wallets.forEach((wallet) => {
      wallet.transactions.forEach((transaction) => {
        if (transaction.id === transactionId) {
          toReturn = transaction
        }
      })
    })

    return toReturn
  }
}

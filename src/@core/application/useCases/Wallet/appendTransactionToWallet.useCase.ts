import Transaction from '@core/domain/entities/Transaction.entity'
import WalletLocalStorageRepository from '@core/infra/repositories/Wallet/WalletAsync.repository'

export default class AppendTransactionToWalletUseCase {
  constructor(private readonly repo: WalletLocalStorageRepository) {}

  async execute(transaction: Transaction) {
    return this.repo.appendTransaction(transaction)
  }
}

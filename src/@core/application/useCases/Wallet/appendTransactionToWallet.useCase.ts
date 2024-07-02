import Transaction from '@core/domain/entities/Transaction.entity'
import WalletAsyncRepositoryInterface from '@core/infra/repositories/Wallet/WalletAsyncRepository.interface'

export default class AppendTransactionToWalletUseCase {
  constructor(private readonly repo: WalletAsyncRepositoryInterface) {}

  async execute(transaction: Transaction) {
    return this.repo.appendTransaction(transaction)
  }
}

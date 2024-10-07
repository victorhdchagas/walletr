import Transaction from '@core/domain/entities/Transaction.entity'
import TransactionRepositoryInterface from '@core/infra/repositories/Transaction/transactionrepository.interface'

export default class CreateTransactionUseCase {
  constructor(private readonly repository: TransactionRepositoryInterface) {}

  async execute(transaction: Transaction) {
    return await this.repository.create(transaction)
  }
}

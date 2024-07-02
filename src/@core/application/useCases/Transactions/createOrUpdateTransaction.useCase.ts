import Transaction from '@core/domain/entities/Transaction.entity'
import TransactionRepositoryInterface from '@core/infra/repositories/Transaction/transactionrepository.interface'

export default class CreateOrUpdateTransactionUseCase {
  constructor(private readonly repository: TransactionRepositoryInterface) {}

  async execute(id: string | undefined, transaction: Partial<Transaction>) {
    if (id) {
      const existsTransaction = await this.repository.get(id)
      if (existsTransaction) {
        return this.repository.update(id, transaction)
      }
    }
    if (!transaction.walletId) throw new Error('Wallet id is required')
    if (!transaction.targetId) throw new Error('Target id is required')
    if (!transaction.price) throw new Error('Price is required')
    if (!transaction.name) throw new Error('Name is required')
    console.log(transaction)
    return await this.repository.create(
      Transaction.createInstance(
        transaction.name,
        transaction.price,
        transaction.walletId,
        transaction.targetId,
        transaction.description,
      ),
    )
  }
}

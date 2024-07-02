import Transaction from '@core/domain/entities/Transaction.entity'

export default interface TransactionRepositoryInterface {
  getByWalletId(walletId: string): Promise<Transaction[]>
  get(id: string): Promise<Transaction | undefined>
  create(transaction: Transaction): Promise<void>
  update(id: string, transaction: Partial<Transaction>): Promise<void>
  remove(transactionId: string): Promise<void>
}

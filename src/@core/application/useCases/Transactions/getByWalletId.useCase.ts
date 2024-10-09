import TransactionRepositoryInterface from '@core/infra/repositories/Transaction/transactionrepository.interface'

export default class GetTransactionByWalletIdUseCase {
  constructor(private readonly repository: TransactionRepositoryInterface) {}

  async execute(walletId: string, startDate?: Date, endDate?: Date) {
    return this.repository.getByWalletId(walletId, startDate, endDate)
  }
}

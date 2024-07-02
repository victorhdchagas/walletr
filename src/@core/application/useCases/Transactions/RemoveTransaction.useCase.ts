import TransactionRepositoryInterface from '@core/infra/repositories/Transaction/transactionrepository.interface'

export default class RemoveTransactionUseCase {
  constructor(private readonly repository: TransactionRepositoryInterface) {}

  async execute(input: string) {
    return this.repository.remove(input)
  }
}

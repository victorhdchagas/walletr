import TransactionRepositoryInterface from '@core/infra/repositories/Transaction/transactionrepository.interface'

export default class GetTransactionByIdUseCase {
  constructor(private readonly repository: TransactionRepositoryInterface) {}

  async execute(input: string) {
    return this.repository.get(input)
  }
}

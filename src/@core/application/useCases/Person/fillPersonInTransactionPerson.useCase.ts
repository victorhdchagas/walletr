import Transaction from '@core/domain/entities/Transaction.entity'
import PersonRepositoryInterface from '@core/infra/repositories/Person/personrepository.interface'

export default class FillPersonInTransactionPersonsUseCase {
  constructor(private readonly repository: PersonRepositoryInterface) {}

  async execute(transactions: Transaction[]): Promise<Transaction[]> {
    const persons = await this.repository.getAll()
    return transactions.map((transaction) => ({
      ...transaction,
      target: persons.find((person) => person.id === transaction.targetId),
    }))
  }
}

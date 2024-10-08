import { myUseCases } from '@contexts/useCases.context'
import { LoaderFunction } from 'react-router-dom'

const TransactionItemLoader: LoaderFunction = async ({ params }) => {
  if (!params.transactionId) return { error: 'Transaction not found' }
  const transactionItem = await myUseCases.transaction.getbyId.execute(
    params.transactionId,
  )
  if (!transactionItem) {
    const Persons = await myUseCases.person.getAll.execute()
    return {
      error: 'Transaction not found',
      persons: Persons.map((person) => person.name).filter(
        (name, index, self) => self.indexOf(name) === index,
      ),
    }
  }
  const [toReturn, Persons] = await Promise.all([
    myUseCases.person.fillTransaction.execute([transactionItem]),
    myUseCases.person.getAll.execute(),
  ])

  return {
    transaction: toReturn[0],
    persons: Persons.map((person) => person.name).filter(
      (name, index, self) => self.indexOf(name) === index,
    ),
  }
}

export default TransactionItemLoader

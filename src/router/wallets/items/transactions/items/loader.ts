import { myUseCases } from '@contexts/useCases.context'
import { LoaderFunction } from 'react-router-dom'

const TransactionItemLoader: LoaderFunction = async ({ params }) => {
  if (!params.transactionId) return { error: 'Transaction not found' }
  const transactionItem = await myUseCases.transaction.getbyId.execute(
    params.transactionId,
  )
  if (!transactionItem) return { error: 'Transaction not found' }
  const toReturn = await myUseCases.person.fillTransaction.execute([
    transactionItem,
  ])

  return {
    transaction: toReturn[0],
  }
}

export default TransactionItemLoader

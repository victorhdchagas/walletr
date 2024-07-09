import { myUseCases } from '@contexts/useCases.context'
import { ActionFunction, redirect } from 'react-router-dom'
import CreateTransactionAction from '../../../actions/transactions/create.transaction.action'
import UpdateTransactionAction from '../../../actions/transactions/update.transaction.action'

const TransactionsAction: ActionFunction = async ({ request, params }) => {
  const formData = await request.formData()
  if (!params.walletId) return redirect('/account/wallets')
  const intent = formData.get('intent') as string

  if (request.method.toLowerCase() === 'delete') {
    if (!formData.get('transactionId'))
      return { error: 'Transaction not found' }
    try {
      await myUseCases.transaction.remove.execute(
        formData.get('transactionId') as string,
      )
    } catch (error) {
      return { error }
    }
  }
  if (request.method.toLowerCase() === 'post' && intent) {
    // Cadastrar usuario se não tiver targetId
    return myUseCases.person.appendOrCreate
      .execute(
        formData.get('target') as string,
        formData.get('targetId') as string,
      )
      .then(async (person) => {
        formData.set('targetId', person.id)

        formData.delete('intent')

        if (intent === 'update') {
          return await UpdateTransactionAction(formData)
        } else if (intent === 'add') {
          return await CreateTransactionAction(formData)
        }
      })
  }
  return redirect(`/account/wallets/${params.walletId}`)
}

export default TransactionsAction

import { myUseCases } from '@contexts/useCases.context'
import { ActionFunction, redirect } from 'react-router-dom'
import CreateTransactionAction from '../../../../actions/transactions/create.transaction.action'
import UpdateTransactionAction from '../../../../actions/transactions/update.transaction.action'

const TransactionsItemAction: ActionFunction = async ({ request, params }) => {
  const formData = await request.formData()
  if (!params.walletId) return redirect('/account/wallets')
  if (request.method.toLowerCase() === 'delete') {
    if (!formData.get('transactionId'))
      return { error: 'Transaction not found' }
    try {
      await myUseCases.transaction.remove.execute(
        formData.get('transactionId') as string,
      )
      return { message: 'ok' }
    } catch (error) {
      return { error }
    }
  }
  if (request.method.toLowerCase() === 'put') {
    return myUseCases.person.appendOrCreate
      .execute(
        formData.get('target') as string,
        formData.get('targetId') as string,
      )
      .then((person) => {
        formData.set('targetId', person.id)
        formData.set('targetId', person.id)
        formData.delete('intent')

        return UpdateTransactionAction(formData)
      })
  }
  if (request.method.toLowerCase() === 'post') {
    // Cadastrar usuario se não tiver targetId
    return myUseCases.person.appendOrCreate
      .execute(
        formData.get('target') as string,
        formData.get('targetId') as string,
      )
      .then((person) => {
        formData.set('targetId', person.id)
        formData.set('targetId', person.id)

        formData.delete('intent')

        return CreateTransactionAction(formData)
      })
  }
  //   return redirect(`/account/wallets/${params.walletId}/transactions`)
}

export default TransactionsItemAction

import { myUseCases } from '@contexts/useCases.context'
import Transaction from '@core/domain/entities/Transaction.entity'

export default async function CreateTransactionAction(formData: FormData) {
  const name = formData.get('name') as string | null
  const walletId = formData.get('walletId') as string | null
  const price = formData.get('price') as string | null
  const targetId = formData.get('targetId') as string | undefined
  if (!name) return { error: 'Name is required' }
  if (!price && isNaN(Number(price))) return { error: 'Price is required' }
  if (!walletId) return { error: 'Something wrong with form, try reconnect.' }
  if (!targetId) return { error: 'Something wrong with form, try reconnect.' }
  const description = formData.get('description') as string | undefined
  const toAdd = Transaction.createInstance(
    name,
    Number(price),
    walletId,
    targetId,
    description,
  )
  return await myUseCases.transaction.create
    .execute(toAdd)
    .catch((error) => {
      return { error }
    })
    .then(() => {
      return { message: 'Transaction created succefully' }
    })
}

import { myUseCases } from '@contexts/useCases.context'
import Transaction from '@core/domain/entities/Transaction.entity'

export default async function CreateTransactionAction(formData: FormData) {
  const name = formData.get('name') as string | null
  const walletId = formData.get('walletId') as string | null
  const price = formData.get('price') as string | null
  if (!name) return { error: 'Name is required' }
  if (!price && isNaN(Number(price))) return { error: 'Price is required' }
  if (!walletId) return { error: 'Something wrong with form, try reconnect.' }
  const target = formData.get('target') as string | undefined
  const description = formData.get('description') as string | undefined
  try {
    await myUseCases.wallet.createOrEditTransaction.execute(
      Transaction.createInstance(
        name,
        Number(price),
        walletId,
        target,
        description,
      ),
    )

    return { message: 'Transaction created succefully' }
  } catch (error) {
    return { error }
  }
}

import { myUseCases } from '@contexts/useCases.context'

export default async function UpdateTransactionAction(formData: FormData) {
  const data = Object.fromEntries(formData.entries())
  try {
    if (!data.id) return { error: 'Transaction not found' }
    if (!data.name) return { error: 'Name is required' }
    if (!data.price && isNaN(Number(data.price)))
      return { error: 'Price is required' }
    const target = formData.get('target') as string | undefined
    const description = formData.get('description') as string | undefined

    const oldTransaction = await myUseCases.wallet.getTransactionById.execute(
      formData.get('id') as string,
    )
    if (!oldTransaction) return { error: 'Transaction not found' }
    await myUseCases.wallet.createOrEditTransaction.execute({
      ...oldTransaction,
      target: target ?? oldTransaction.target,
      description: description ?? oldTransaction.description,
      updatedAt: new Date(),
      name: formData.get('name') as string,
      price: Number(formData.get('price') as string),
    })

    return { message: 'Transaction created succefully' }
  } catch (error) {
    return { error }
  }
}

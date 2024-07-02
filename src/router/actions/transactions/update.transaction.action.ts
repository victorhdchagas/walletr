import { myUseCases } from '@contexts/useCases.context'

export default async function UpdateTransactionAction(formData: FormData) {
  const data = Object.fromEntries(formData.entries())
  try {
    if (!data.id) return { error: 'Transaction not found' }
    if (!data.name) return { error: 'Name is required' }
    if (!data.price && isNaN(Number(data.price)))
      return { error: 'Price is required' }
    const targetId = formData.get('targetId') as string | undefined
    const description = formData.get('description') as string | undefined

    const oldTransaction = await myUseCases.transaction.getbyId.execute(
      formData.get('id') as string,
    )
    if (!oldTransaction) return { error: 'Transaction not found' }
    await myUseCases.transaction.createOrUpdate.execute(oldTransaction.id, {
      ...oldTransaction,
      targetId: targetId ?? oldTransaction.targetId,
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

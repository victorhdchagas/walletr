import { myUseCases } from '@contexts/useCases.context'

export default async function CreateWalletAction(formData: FormData) {
  const name = formData.get('name') as string | null
  const userId = formData.get('userId') as string | null
  if (!name) return { error: 'Name is required' }
  if (!userId) return { error: 'Something wrong with form, try reconnect.' }
  try {
    const previousWallet = await myUseCases.wallet.getByProperty.execute(
      'name',
      name.trim(),
    )
    if (previousWallet && previousWallet.length > 0)
      return { error: 'Wallet already exists' }
    await myUseCases.wallet.add.execute({ name, userId })
    return { message: 'Wallet created succefully' }
  } catch (error) {
    return { error }
  }
}

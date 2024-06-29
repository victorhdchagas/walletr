import { myUseCases } from '@contexts/useCases.context'

export default async function RemoveWalletAction(formData: FormData) {
  const walletId = formData.get('walletId') as string
  try {
    await myUseCases.wallet.remove.execute(walletId)
  } catch (error) {
    return { error }
  }
}

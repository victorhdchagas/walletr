import { ActionFunction, redirect } from 'react-router-dom'
import CreateWalletAction from '../../actions/wallets/create.wallet.action'
import RemoveWalletAction from '../../actions/wallets/remove.wallet.action'
import { getAuthenticatedLoader } from '../../loaders/getAuthenticated.Loader'
import { myUseCases } from '@contexts/useCases.context'

const WalletItemAction: ActionFunction = async ({ request, params }) => {
  const formData = await request.formData()
  if (!params.walletId) throw new Error('Invalid wallet')
  const user = await getAuthenticatedLoader()
  formData.append('userId', user?.user.id as string)
  const method = request.method.toLowerCase()
  if (method === 'post') {
    return await CreateWalletAction(formData)
  }
  if (method === 'delete') {
    formData.append('walletId', params.walletId)
    const toReturn = await RemoveWalletAction(formData)
    if (toReturn?.error) return toReturn
    return redirect('/account/wallets')
  }
  if (method === 'put') {
    await myUseCases.wallet.update.execute(
      params.walletId,
      Object.fromEntries(formData),
    )
  }
  return { message: 'ok' }
}

export default WalletItemAction

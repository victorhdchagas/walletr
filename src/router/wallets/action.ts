import { ActionFunction, redirect } from 'react-router-dom'
import CreateWalletAction from '../actions/wallets/create.wallet.action'
import RemoveWalletAction from '../actions/wallets/remove.wallet.action'

const WalletAction: ActionFunction = async ({ request, params }) => {
  const formData = await request.formData()
  if (!params.walletId || params.walletId !== 'create')
    throw new Error('Invalid wallet')

  const method = request.method.toLowerCase()
  if (method === 'post') {
    return await CreateWalletAction(formData)
  }
  if (method === 'delete') {
    await RemoveWalletAction(formData)
    return redirect('/account/wallets')
  }
  if (method === 'put') {
    await CreateWalletAction(formData)
  }
  return { message: 'ok' }
}

export default WalletAction

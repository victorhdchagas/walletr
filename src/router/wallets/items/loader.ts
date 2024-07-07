import { myUseCases } from '@contexts/useCases.context'
import { LoaderFunction } from 'react-router-dom'

const WalletItemLoader: LoaderFunction = async ({ params }) => {
  if (!params.walletId) throw new Error('Invalid wallet')
  const wallet = await myUseCases.wallet.getById.execute(params.walletId)
  return { wallet }
}

export default WalletItemLoader

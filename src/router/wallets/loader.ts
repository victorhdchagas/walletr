import { myUseCases } from '@contexts/useCases.context'
import WalletWithBalanceDTO from '@core/domain/dtos/wallets/wallet-with-balance.dto'
import { LoaderFunction } from 'react-router-dom'
import { getAuthenticatedLoader } from '../loaders/getAuthenticated.Loader'

const WalletLoader: LoaderFunction = async () => {
  const user = await getAuthenticatedLoader()
  const wallets = await myUseCases.wallet.getByProperty.execute(
    'userId',
    user?.user.id as string,
  )
  return {
    ...user,
    wallets: wallets?.map(
      (wallet) =>
        new WalletWithBalanceDTO(
          wallet.id,
          wallet.name,
          wallet.balance,
          wallet.createdAt,
          wallet.transactions.length,
        ),
    ),
  }
}

export default WalletLoader

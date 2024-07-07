import CreateWalletForm from '@pages/protected/wallets/components/createWalletForm.component'
import { RouteObject } from 'react-router-dom'
import WalletItemAction from './action'
import WalletItemLoader from './loader'

const WalletItemRoute: RouteObject = {
  path: ':walletId',
  Component: CreateWalletForm,
  loader: WalletItemLoader,
  action: WalletItemAction,
}

export default WalletItemRoute

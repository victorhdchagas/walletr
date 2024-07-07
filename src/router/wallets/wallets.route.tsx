import DashboardPage from '@pages/protected/dashboard/index.page'
import WalletPage from '@pages/protected/wallets/index.page'
import { RouteObject } from 'react-router-dom'
import WalletAction from './action'
import WalletItemRoute from './items/route'
import TransactionRoute from './items/transactions/route'
import WalletLoader from './loader'

const WalletRoutes: { children: RouteObject[] } = {
  children: [
    { index: true, Component: DashboardPage },
    {
      path: 'wallets',
      Component: WalletPage,
      children: [WalletItemRoute],

      loader: WalletLoader,
      action: WalletAction,
    },
    TransactionRoute,
  ],
}

export default WalletRoutes

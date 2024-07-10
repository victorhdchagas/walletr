import DashboardPage from '@pages/protected/dashboard/index.page'
import WalletPage from '@pages/protected/wallets/index.page'
import { RouteObject } from 'react-router-dom'
import WalletAction from './action'
import WalletItemRoute from './items/route'
import WalletImportRoute from './items/import/route'
import TransactionRoute from './items/transactions/route'
import WalletLoader from './loader'
import FillTemplateRoute from './items/import/filltemplate/route'

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
    FillTemplateRoute,
    WalletImportRoute,
  ],
}

export default WalletRoutes

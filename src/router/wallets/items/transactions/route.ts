import { RouteObject } from 'react-router-dom'
import TransactionsLoader from './loader'
import WalletDetailsPage from '@pages/protected/wallets/details/index.page'
import TransactionsAction from './action'
import TransactionItemRoute from './items/route'

const TransactionRoute: RouteObject = {
  path: 'wallets/:walletId/transactions',
  loader: TransactionsLoader,
  Component: WalletDetailsPage,
  action: TransactionsAction,

  children: [TransactionItemRoute],
}
export default TransactionRoute

import CreateTransactionForm from '@pages/protected/wallets/details/components/createTransactionForm.component'
import { RouteObject } from 'react-router-dom'
import TransactionsItemAction from './action'
import TransactionItemLoader from './loader'

const TransactionItemRoute: RouteObject = {
  path: ':transactionId',
  Component: CreateTransactionForm,
  loader: TransactionItemLoader,
  action: TransactionsItemAction,
}

export default TransactionItemRoute

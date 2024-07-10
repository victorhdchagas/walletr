import ImportTemplatePage from '@pages/protected/wallets/imports/importtemplate.page'
import { RouteObject } from 'react-router-dom'
import WalletImportLoader from './loader'

const WalletImportRoute: RouteObject = {
  path: 'wallets/:walletId/import',
  loader: WalletImportLoader,
  Component: ImportTemplatePage,

  //   children: [TransactionItemRoute],
}
export default WalletImportRoute

import FillTemplatePage from '@pages/protected/wallets/imports/filltemplate.page'
import { RouteObject } from 'react-router-dom'
import FillTemplateLoader from './loader'

const FillTemplateRoute: RouteObject = {
  path: 'wallets/:walletId/import/:templateId',
  loader: FillTemplateLoader,
  Component: FillTemplatePage,

  //   children: [TransactionItemRoute],
}
export default FillTemplateRoute

import FillTemplatePage from '@pages/protected/wallets/imports/filltemplate.page'
import { RouteObject } from 'react-router-dom'
import FillTemplateLoader from './loader'
import FillTemplateAction from './action'

const FillTemplateRoute: RouteObject = {
  path: 'wallets/:walletId/import/:templateId',
  loader: FillTemplateLoader,
  Component: FillTemplatePage,
  action: FillTemplateAction,
}
export default FillTemplateRoute

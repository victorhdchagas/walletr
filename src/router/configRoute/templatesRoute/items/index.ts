import TemplateItemsPage from '@pages/templates/items/index.items'
import { RouteObject } from 'react-router-dom'
import templateItemsLoader from './loader'
import templateItemsAction from './action'
import TemplateItemRoute from './item'

const TemplateItemsRoute: RouteObject = {
  path: 'templates/:id/items',
  Component: TemplateItemsPage,
  loader: templateItemsLoader,
  action: templateItemsAction,
  children: [TemplateItemRoute],
}
export default TemplateItemsRoute

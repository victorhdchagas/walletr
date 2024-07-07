import CreateTemplateItemForm from '@pages/templates/items/components/createTemplateItemForm.component'
import { RouteObject } from 'react-router-dom'
import templateItemLoader from './loader'
import templateItemAction from './action'

const TemplateItemRoute: RouteObject = {
  path: ':itemId',
  Component: CreateTemplateItemForm,
  loader: templateItemLoader,
  action: templateItemAction,
}
export default TemplateItemRoute

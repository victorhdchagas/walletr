import CreateTemplateForm from '@pages/templates/components/createTemplateForm.component'
import { RouteObject } from 'react-router-dom'
import editOrAddLoader from './loader'
import editOrAddAction from './action'

const editOrAddRoute: RouteObject = {
  path: ':id',
  loader: editOrAddLoader,
  Component: CreateTemplateForm,
  action: editOrAddAction,
}

export default editOrAddRoute

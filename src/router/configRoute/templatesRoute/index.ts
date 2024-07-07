import TemplateIndexPage from '@pages/templates/index.page'
import { RouteObject } from 'react-router-dom'
import templatesAction from './action'
import templatesLoader from './loader'
import editOrAddRoute from './editOrAdd'

const templatesRoute: RouteObject = {
  path: 'templates',
  Component: TemplateIndexPage,
  action: templatesAction,
  loader: templatesLoader,
  children: [editOrAddRoute],
}

export default templatesRoute

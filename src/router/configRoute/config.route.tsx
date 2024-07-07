import PersonsPage from '@pages/config/persons/index.page'
import ManAtWorkPage from '@pages/protected/defaults/menatwork/index.page'
import { RouteObject } from 'react-router-dom'
import PersonPageLoader from '../loaders/personsPage.Loader'
import templatesRoute from './templatesRoute'
import TemplateItemsRoute from './templatesRoute/items'

const ConfigRoutes: { children: RouteObject[] } = {
  children: [
    { index: true, Component: ManAtWorkPage },
    templatesRoute,
    { path: 'persons', Component: PersonsPage, loader: PersonPageLoader },
    TemplateItemsRoute,
  ],
}

export default ConfigRoutes

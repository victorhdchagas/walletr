import PersonsPage from '@pages/config/persons/index.page'
import ManAtWorkPage from '@pages/protected/defaults/menatwork/index.page'
import { RouteObject } from 'react-router-dom'
import PersonPageLoader from './loaders/personsPage.Loader'

const ConfigRoutes: { children: RouteObject[] } = {
  children: [
    { index: true, Component: ManAtWorkPage },
    { path: 'templates', Component: ManAtWorkPage },
    { path: 'persons', Component: PersonsPage, loader: PersonPageLoader },
  ],
}

export default ConfigRoutes

import PersonsPage from '@pages/config/persons/index.page'
import ManAtWorkPage from '@pages/protected/defaults/menatwork/index.page'
import { RouteObject } from 'react-router-dom'
import PersonPageLoader from './loaders/personsPage.Loader'
import TemplateIndexPage from '@pages/templates/index.page'
import { myUseCases } from '@contexts/useCases.context'

const ConfigRoutes: { children: RouteObject[] } = {
  children: [
    { index: true, Component: ManAtWorkPage },
    {
      path: 'templates',
      Component: TemplateIndexPage,
      async action({ request }) {
        const formData = Object.fromEntries(await request.formData()) as {
          name: string
          userId: string
          description: string
        }
        if (request.method.toUpperCase() === 'POST') {
          return myUseCases.session.GetAuthenticatedUser.execute(
            localStorage.getItem('session') ?? '',
          )
            .then((user) => {
              if (!user) throw new Error('User not found')
              return myUseCases.templates.create.execute(
                formData.name,
                user.id,
                formData.description,
              )
            })
            .then(() => {
              return { message: 'ok' }
            })
            .catch((e) => {
              return { error: e.message }
            })
        }
        return { message: 'ok' }
      },
      loader() {
        return myUseCases.session.GetAuthenticatedUser.execute(
          localStorage.getItem('session') ?? '',
        )
          .then((user) => {
            if (!user) throw new Error('User not found')
            return myUseCases.templates.getByUserid.execute(user.id)
          })
          .then((templates) => {
            return { templates }
          })
          .catch((e) => {
            return { templates: [], error: e.message }
          })
      },
    },
    { path: 'persons', Component: PersonsPage, loader: PersonPageLoader },
  ],
}

export default ConfigRoutes

import { myUseCases } from '@contexts/useCases.context'
import { LoaderFunction } from 'react-router-dom'

const templatesLoader: LoaderFunction = async () => {
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
}

export default templatesLoader

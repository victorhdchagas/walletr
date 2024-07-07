import { myUseCases } from '@contexts/useCases.context'
import { LoaderFunction } from 'react-router-dom'

const editOrAddLoader: LoaderFunction = ({ params }) => {
  return myUseCases.session.GetAuthenticatedUser.execute(
    localStorage.getItem('session') ?? '',
  )
    .then((user) => {
      if (!user) throw new Error('User not found')
      return myUseCases.templates.getByUserid.execute(user.id)
    })
    .then((templates) => {
      return {
        template: templates.find((template) => template.id === params.id),
      }
    })
    .catch((e) => {
      console.trace(e)
      return { template: undefined, error: e.message }
    })
}

export default editOrAddLoader

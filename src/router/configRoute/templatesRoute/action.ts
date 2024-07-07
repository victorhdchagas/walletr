import { myUseCases } from '@contexts/useCases.context'
import { ActionFunction } from 'react-router-dom'

const templatesAction: ActionFunction = async ({ request }) => {
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
}

export default templatesAction

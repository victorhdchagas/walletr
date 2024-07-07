import { myUseCases } from '@contexts/useCases.context'
import { ActionFunction } from 'react-router-dom'

const editOrAddAction: ActionFunction = async ({ request, params }) => {
  const formData = Object.fromEntries(await request.formData())
  const method = request.method.toLowerCase()
  if (method === 'delete') {
    await myUseCases.templates.remove.execute(params.id as string)
    return { message: 'ok' }
  }
  if (method === 'post') {
    return myUseCases.session.GetAuthenticatedUser.execute(
      localStorage.getItem('session') ?? '',
    )
      .then((user) => {
        if (!user) throw new Error('User not found')
        return myUseCases.templates.create.execute(
          formData.name as string,
          user.id,
          formData.description as string,
        )
      })
      .then(() => {
        return { message: 'ok' }
      })
      .catch((e) => {
        return { error: e.message }
      })
  }

  if (method === 'put') {
    return await myUseCases.session.GetAuthenticatedUser.execute(
      localStorage.getItem('session') ?? '',
    )
      .then((user) => {
        if (!user) throw new Error('User not found')
        return myUseCases.templates.set.execute(formData.id as string, {
          name: formData.name as string,
          userId: user.id,
          description: formData.description as string,
        })
      })
      .then(() => {
        return { message: 'ok' }
      })
      .catch((e) => {
        console.error(e)
        return { error: e.message }
      })
  }
}

export default editOrAddAction

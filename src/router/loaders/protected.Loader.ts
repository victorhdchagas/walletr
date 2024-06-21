import { myUseCases } from '@contexts/useCases.context'
import { LoaderFunctionArgs, redirect } from 'react-router-dom'

export async function ProtectedLoader({ request }: LoaderFunctionArgs) {
  const user = await myUseCases.session.GetAuthenticatedUser.execute()
  if (!user) {
    const params = new URLSearchParams()
    params.set('from', new URL(request.url).pathname)
    return redirect('/signin?' + params.toString())
  }
  return null
}

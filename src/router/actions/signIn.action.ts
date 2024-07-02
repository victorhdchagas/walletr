import { myUseCases } from '@contexts/useCases.context'
import { LoaderFunctionArgs, redirect } from 'react-router-dom'

export default async function SignInAction({ request }: LoaderFunctionArgs) {
  const formData = await request.formData()
  const email = formData.get('email') as string | null
  if (!email) return { error: 'Email is required' }
  try {
    const token = await myUseCases.session.authenticateUser.execute(email)
    localStorage.setItem('session', token)
  } catch (error) {
    console.error(error)
    return { error }
  }

  const redirectTo = formData.get('redirectTo') as string | null
  return redirect(redirectTo || '/account')
}

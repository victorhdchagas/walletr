import { myUseCases } from '@contexts/useCases.context'
import { LoaderFunctionArgs, redirect } from 'react-router-dom'

export default async function SignUpAction({ request }: LoaderFunctionArgs) {
  const formData = await request.formData()
  const email = formData.get('email') as string | null
  if (!email) return { error: 'Email is required' }
  try {
    await myUseCases.user.createUser.execute(email)
  } catch (error) {
    console.error(error)
    return { error }
  }

  const redirectTo = formData.get('redirectTo') as string | null
  return redirect(redirectTo || '/signin')
}

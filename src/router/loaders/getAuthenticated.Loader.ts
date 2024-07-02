import { myUseCases } from '@contexts/useCases.context'
export async function getAuthenticatedLoader() {
  const user = await myUseCases.session.GetAuthenticatedUser.execute(
    localStorage.getItem('session') ?? '',
  )
  if (user) return { user }
  return null
}

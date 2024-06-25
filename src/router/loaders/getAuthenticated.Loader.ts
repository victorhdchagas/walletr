import { myUseCases } from '@contexts/useCases.context'
export async function getAuthenticatedLoader() {
  const user = await myUseCases.session.GetAuthenticatedUser.execute()
  if (user) return { user }
  return null
}

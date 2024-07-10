import { myUseCases } from '@contexts/useCases.context'
import { TEMPLATE_ITEM_MAP } from '@lib/constants'
import { LoaderFunction } from 'react-router-dom'

const WalletImportLoader: LoaderFunction = async () => {
  const authenticatedUser =
    await myUseCases.session.GetAuthenticatedUser.execute(
      localStorage.getItem('session') ?? '',
    )
  if (!authenticatedUser) throw new Error('User not found')
  const templates = await myUseCases.templates.getByUserid.execute(
    authenticatedUser.id,
  )

  return { templates, total: TEMPLATE_ITEM_MAP.length }
}

export default WalletImportLoader

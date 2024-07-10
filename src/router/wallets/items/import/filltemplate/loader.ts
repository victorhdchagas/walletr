import { myUseCases } from '@contexts/useCases.context'
import { TEMPLATE_ITEM_MAP } from '@lib/constants'
import { LoaderFunction } from 'react-router-dom'

const FillTemplateLoader: LoaderFunction = async ({ params }) => {
  if (!params.walletId) throw new Error('Wallet not found')
  if (!params.templateId) throw new Error('Template not found')

  const template = await myUseCases.templates.get.execute(params.templateId)
  const wallet = await myUseCases.wallet.getById.execute(params.walletId)

  return {
    itemmap: TEMPLATE_ITEM_MAP,
    template,
    wallet,
  }
}

export default FillTemplateLoader

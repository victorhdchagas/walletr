import { myUseCases } from '@contexts/useCases.context'
import { TEMPLATE_ITEM_MAP } from '@lib/constants'
import { LoaderFunction } from 'react-router-dom'

const templateItemsLoader: LoaderFunction = async ({ params }) => {
  if (!params.id) throw new Error('Id not found')
  const items = await myUseCases.templates.getItems.execute(params.id)
  return {
    templateId: params.id,
    items: items.map((item) => ({
      ...item,
      targetName: TEMPLATE_ITEM_MAP.find(
        (field) => field.split(':')[1] === item.targetName,
      )?.split(':')[0],
    })),
  }
}

export default templateItemsLoader

import { myUseCases } from '@contexts/useCases.context'
import { TEMPLATE_ITEM_MAP } from '@lib/constants'
import { LoaderFunction } from 'react-router-dom'

const templateItemLoader: LoaderFunction = async ({ params }) => {
  if (!params.id) throw new Error('Id not found')

  const currentItems = await myUseCases.templates.getItems.execute(params.id)

  return {
    templateId: params.id,
    fields: TEMPLATE_ITEM_MAP.filter(
      (field) =>
        !currentItems.find(
          (item) =>
            item.targetName === field.split(':')[1] &&
            item.id !== params.itemId,
        ),
    ),
    templateItem: currentItems.find((item) => item.id === params.itemId),
  }
}

export default templateItemLoader

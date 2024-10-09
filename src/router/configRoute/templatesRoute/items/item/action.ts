import { myUseCases } from '@contexts/useCases.context'
import { GetTemplateItemTypeByFieldname } from '@lib/templateItemsTypesConversor'
import { ActionFunction } from 'react-router-dom'

const templateItemAction: ActionFunction = async ({ request, params }) => {
  const formData = Object.fromEntries(await request.formData())
  if (!params.id) throw new Error('Id not found')
  console.log('templateItemActon', params)

  const method = request.method.toLowerCase()
  if (method === 'post') {
    const targetType = GetTemplateItemTypeByFieldname(
      formData.targetName as string,
    )
    if (!targetType) throw new Error('Target type not found')
    await myUseCases.templates.appendItem.execute(
      params.id,
      formData.name as string,
      '',
      formData.targetName as string,
      targetType,
    )
  }
  if (method === 'put') {
    const targetType = GetTemplateItemTypeByFieldname(
      formData.targetName as string,
    )
    if (!targetType) throw new Error('Target type not found')
    if (!params.itemId) throw new Error('Item id not found')
    await myUseCases.templates.updateItem.execute(params.id, {
      id: params.itemId,
      originName: formData.name as string,
      targetName: formData.targetName as string,
      targetType,
    })
  }
  if (method === 'delete') {
    if (!params.itemId) throw new Error('Item id not found')
    await myUseCases.templates.removeItem.execute(params.id, params.itemId)
  }

  return { message: 'ok' }
}

export default templateItemAction

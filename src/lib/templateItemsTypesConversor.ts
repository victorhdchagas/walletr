import { TEMPLATE_ITEM_TYPES } from './constants'

export default function TemplateItemsTypesConversor(
  fieldName: string,
  value: unknown,
) {
  for (const type in Object.keys(TEMPLATE_ITEM_TYPES)) {
    if (
      TEMPLATE_ITEM_TYPES[type as keyof typeof TEMPLATE_ITEM_TYPES].includes(
        fieldName,
      )
    ) {
      switch (type) {
        case 'string':
          return String(value)
        case 'number':
          return Number(value)
        case 'date':
          if (typeof value === 'string') return new Date(value)
          break
        default:
          throw new Error('Not found')
      }
    }
  }
  return value
}

export function GetTemplateItemTypeByFieldname(
  fieldName: string,
): keyof typeof TEMPLATE_ITEM_TYPES | undefined {
  for (const type of Object.keys(TEMPLATE_ITEM_TYPES)) {
    if (
      TEMPLATE_ITEM_TYPES[
        type.toLowerCase() as keyof typeof TEMPLATE_ITEM_TYPES
      ]
        .map((item) => item.toLowerCase())
        .includes(fieldName.toLowerCase())
    ) {
      return type as keyof typeof TEMPLATE_ITEM_TYPES | undefined
    }
  }
}

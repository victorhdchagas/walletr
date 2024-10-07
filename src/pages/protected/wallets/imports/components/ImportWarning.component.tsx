import WarningAtom from '@components/atoms/labels/warning.atom'
import { Link } from 'react-router-dom'

export default function ImportWarningComponent({
  templateId,
  itemmap,
  templateItems,
}: {
  templateId: string
  itemmap: string[]
  templateItems: { targetName: string }[]
}) {
  if (!(templateItems.length > 0 && templateItems.length !== itemmap.length))
    return null
  return (
    <WarningAtom>
      Template incompleto, considere{' '}
      <Link
        to={`/config/templates/${templateId}/items`}
        className="underline font-semibold hover:animate-pulse"
      >
        ajustar
      </Link>{' '}
      a importação
      {itemmap
        .map((item) => item.split(':')[1])
        .filter((item) => !templateItems.some((i) => i.targetName === item))
        .map(
          (item) =>
            itemmap.find((i) => i.split(':')[1] === item)?.split(':')[0],
        )
        .map((item) => (
          <div key={item} className="text-lime-900">
            - {item}
          </div>
        ))}
    </WarningAtom>
  )
}

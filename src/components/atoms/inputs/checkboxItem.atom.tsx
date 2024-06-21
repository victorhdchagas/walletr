import { useId } from 'react'

export interface CheckboxListItemAtomProps {
  checked: boolean
  label: string
}

export interface CheckboxListAtomProps {
  item: CheckboxListItemAtomProps
  index: `${number}`
}
export default function CheckboxItemAtom({
  item,
  index,
}: CheckboxListAtomProps) {
  const id = useId()
  return (
    <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
      <div className="flex items-center ps-3">
        <input
          id={`checkbox-${index}${id}`}
          type="checkbox"
          defaultChecked={item.checked}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
        />
        <label
          htmlFor={`checkbox-${index}${id}`}
          className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          {item.label}
        </label>
      </div>
    </li>
  )
}

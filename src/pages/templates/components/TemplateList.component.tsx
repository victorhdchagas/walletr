import Template from '@core/domain/entities/Template.entity'
import { MinusSquare, NotePencil } from '@phosphor-icons/react'
import { Link, useFetcher, useLocation } from 'react-router-dom'

export default function TemplateList({ templates }: { templates: Template[] }) {
  const location = useLocation()
  const fetcher = useFetcher()
  return (
    <table className="transition-all w-full text-left select-none">
      <thead>
        <tr className="">
          <th>Name</th>
          <th>Description</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {templates.map((template) => (
          <tr
            key={template.id}
            title={template.id}
            className="border-dashed border-b border-emerald-800 h-16  transition-all "
          >
            <td className="cursor-default min-w-52">
              <Link to={`/config/templates/${template.id}/items`}>
                {template.name}
              </Link>
            </td>
            <td className="w-full">{template.description}</td>
            <td className="min-w-24 flex gap-2 justify-center items-center h-16 w-full">
              <Link
                to={`/config/templates/${template.id}`}
                state={{ backgroundLocation: location }}
              >
                <NotePencil
                  size={26}
                  className="text-emerald-400 cursor-pointer  rounded-md hover:scale-110 transition-all"
                />
              </Link>

              <fetcher.Form
                method="delete"
                action={`/config/templates/${template.id}`}
              >
                <button type="submit">
                  <MinusSquare
                    size={26}
                    className="text-red-700 cursor-pointer  rounded-md hover:scale-110 transition-all"
                  />
                </button>
              </fetcher.Form>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

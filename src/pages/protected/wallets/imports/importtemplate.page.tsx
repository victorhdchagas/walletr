import WarningAtom from '@components/atoms/labels/warning.atom'
import SessionHeaderMolecule from '@components/molecules/sessionHeader.molecule'
import Template from '@core/domain/entities/Template.entity'
import { CursorClick } from '@phosphor-icons/react'
import { Link, useLoaderData, useLocation } from 'react-router-dom'

export default function ImportTemplatePage() {
  const data = useLoaderData() as { templates: Template[]; total: number }
  const location = useLocation()
  return (
    <section className="overflow-y-auto h-full flex flex-col">
      <SessionHeaderMolecule title="Selecione o template"></SessionHeaderMolecule>
      <div className="mt-4 grid grid-cols-1 gap-4 ">
        {data.templates.length === 0 && (
          <Link
            to="/config/templates/create"
            state={{
              backgroundLocation: {
                ...location,
                pathname: '/config/templates',
              },
            }}
          >
            <WarningAtom> Nenhum template encontrado</WarningAtom>
          </Link>
        )}
        {data.templates.map((template) => (
          <Link
            key={template.id}
            to={`./${template.id}`}
            className="bg-slate-500 hover:bg-slate-400 cursor-pointer rounded-lg shadow p-4 relative group/template transition-all "
          >
            <h2 className="text-lg font-medium mb-2 text-gray-700 group-hover/template:animate-pulse">
              {template.name}
            </h2>
            <p className="text-gray-700 group-hover/template:animate-pulse">
              {template.description}
            </p>
            <div
              className="absolute top-0 right-[10%] z-10 w-fit flex flex-row flex-nowrap 
                group-hover/template:text-gray-500 group-hover/template:border-slate-300 transition-all
            justify-center gap-1 rounded-b-lg border-slate-400  h-fit text-gray-400 border-b border-r p-1"
            >
              qtd: {template.items.length}/{data.total}
            </div>
            <CursorClick
              size={44}
              className="absolute fill-emerald-800 group-hover/template:fill-emerald-300 top-5 right-2 transition-all group-hover/template:animate-pulse -z-0"
            />
          </Link>
        ))}
      </div>
    </section>
  )
}

import Template from '@core/domain/entities/Template.entity'
import { PlusSquare } from '@phosphor-icons/react'
// import { useState } from 'react'
import { Link, Outlet, useLoaderData, useLocation } from 'react-router-dom'
import TemplateList from './components/TemplateList.component'
import ErrorAtom from '@components/atoms/labels/error.atom'
// import CreateTemplate from './components/createTemplate.component'
// import PortalMolecule from '@components/molecules/Portal.molecule'
import SessionHeaderMolecule from '@components/molecules/sessionHeader.molecule'

export default function TemplateIndexPage() {
  //   const [visible, setVisible] = useState(false)
  const location = useLocation()
  const loadedData = useLoaderData() as {
    templates: Template[]
    error?: string
  }

  return (
    <div className="container flex-col w-full">
      <SessionHeaderMolecule title="Templates">
        <Link
          to="/config/templates/create"
          state={{ backgroundLocation: location }}
        >
          <PlusSquare
            size={32}
            className="text-emerald-400 cursor-pointer  rounded-md "
          />
        </Link>
      </SessionHeaderMolecule>
      <ErrorAtom>{loadedData.error}</ErrorAtom>
      {loadedData.templates.length === 0 && <p>No templates found</p>}

      {loadedData.templates.length > 0 && (
        <TemplateList templates={loadedData.templates} />
      )}

      <Outlet />
    </div>
  )
}

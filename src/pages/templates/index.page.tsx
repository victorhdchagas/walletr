import Template from '@core/domain/entities/Template.entity'
import { PlusSquare } from '@phosphor-icons/react'
import React, { useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import TemplateList from './components/TemplateList.component'
import ErrorAtom from '@components/atoms/labels/error.atom'
import CreateTemplate from './components/createTemplate.component'
import PortalMolecule from '@components/molecules/Portal.molecule'
import SessionHeaderMolecule from '@components/molecules/sessionHeader.molecule'

export default function TemplateIndexPage() {
  const [visible, setVisible] = useState(false)
  const loadedData = useLoaderData() as {
    templates: Template[]
    error?: string
  }

  return (
    <div>
      <SessionHeaderMolecule title="Templates">
        <PlusSquare
          size={32}
          className="text-emerald-400 cursor-pointer  rounded-md "
          onClick={() => setVisible((state) => !state)}
        />
      </SessionHeaderMolecule>
      <ErrorAtom>{loadedData.error}</ErrorAtom>
      {loadedData.templates.length === 0 && <p>No templates found</p>}

      {loadedData.templates.length > 0 && (
        <TemplateList templates={loadedData.templates} />
      )}
      <PortalMolecule visible={visible} onClose={() => setVisible(false)}>
        <CreateTemplate />
      </PortalMolecule>
    </div>
  )
}

import PortalMolecule from '@components/molecules/Portal.molecule'
import { useLoaderData, useLocation } from 'react-router-dom'
import CreateTemplate from './createTemplate.component'
import Template from '@core/domain/entities/Template.entity'

export default function CreateTemplateForm() {
  const location = useLocation()
  const loadedData = useLoaderData() as { template?: Template; error?: string }
  const isFromLink = !!location.state
  return isFromLink ? (
    <PortalMolecule visible={true} onClose={() => history.back()}>
      <CreateTemplate template={loadedData.template} />
    </PortalMolecule>
  ) : (
    <CreateTemplate template={loadedData.template} />
  )
}

import PortalMolecule from '@components/molecules/Portal.molecule'
import TemplateItem from '@core/domain/entities/TemplateItem.entity'
import { useLoaderData } from 'react-router-dom'
import CreateTemplateItem from './createTemplateItem.component'

export default function CreateTemplateItemForm() {
  const loadedData = useLoaderData() as {
    templateItem?: TemplateItem
    error?: string
    fields: string[]
  }
  return (
    <PortalMolecule visible={true} onClose={() => history.back()}>
      <CreateTemplateItem
        fields={loadedData.fields}
        templateItem={loadedData.templateItem}
      />
    </PortalMolecule>
  )
}

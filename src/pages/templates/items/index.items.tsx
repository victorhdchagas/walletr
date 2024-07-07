import SessionHeaderMolecule from '@components/molecules/sessionHeader.molecule'
import { PlusSquare } from '@phosphor-icons/react'
import {
  Link,
  Outlet,
  useLoaderData,
  useLocation,
  useParams,
} from 'react-router-dom'
import TemplateItemList from './components/TemplateItemsList.component'
import TemplateItem from '@core/domain/entities/TemplateItem.entity'

export default function TemplateItemsPage() {
  const params = useParams()
  const loadedData = useLoaderData() as {
    items: TemplateItem[]
    error?: string
  }
  const location = useLocation()
  return (
    <div className="container flex-col w-full">
      <SessionHeaderMolecule title="Templates Items">
        <Link
          to={`/config/templates/${params.id}/items/create`}
          state={{ backgroundLocation: location }}
        >
          <PlusSquare
            size={32}
            className="text-emerald-400 cursor-pointer  rounded-md "
          />
        </Link>
      </SessionHeaderMolecule>
      <TemplateItemList templates={loadedData.items ?? []} />
      <Outlet />
    </div>
  )
}

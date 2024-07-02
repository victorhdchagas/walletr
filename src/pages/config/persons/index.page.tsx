import TitleAtom from '@components/atoms/labels/title.atom'
import { useLoaderData } from 'react-router-dom'
import ListPerson from './components/ListPerson.component'
import Person from '@core/domain/entities/Person.entity'

export default function PersonsPage() {
  const loadedData = useLoaderData() as { persons: Person[] }

  return (
    <div className="px-2 pt-1 w-full flex flex-col">
      <TitleAtom className="border-b  w-full">Persons</TitleAtom>

      <ListPerson persons={loadedData?.persons ?? []} />
    </div>
  )
}

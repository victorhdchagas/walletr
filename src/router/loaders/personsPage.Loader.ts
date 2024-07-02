import { myUseCases } from '@contexts/useCases.context'

export default async function PersonPageLoader() {
  const persons = await myUseCases.person.getAll.execute()
  return { persons }
}

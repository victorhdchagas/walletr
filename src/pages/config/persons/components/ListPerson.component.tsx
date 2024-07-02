import Person from '@core/domain/entities/Person.entity'

export default function ListPerson({ persons }: { persons: Person[] }) {
  return (
    <ul>
      {persons.map((person) => (
        <li key={person.id}>{person.name}</li>
      ))}
    </ul>
  )
}

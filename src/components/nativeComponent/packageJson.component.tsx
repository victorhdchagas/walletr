export default function AppDetailsComponent({
  name,
  version,
}: {
  name: string
  version: string
}) {
  return (
    <table>
      <thead>
        <tr>
          <th className="min-w-32 text-left">Name</th>
          <th className="min-w-32 text-left">Version</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{name}</td>
          <td>{version}</td>
        </tr>
      </tbody>
    </table>
  )
}

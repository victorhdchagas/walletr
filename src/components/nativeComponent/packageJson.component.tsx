import packageJson from '../../../package.json'

export default function AppDetailsComponent() {
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
          <td>{packageJson.name}</td>
          <td>{packageJson.version}</td>
        </tr>
      </tbody>
    </table>
  )
}

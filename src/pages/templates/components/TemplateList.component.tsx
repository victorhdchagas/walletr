import Template from '@core/domain/entities/Template.entity'

export default function TemplateList({ templates }: { templates: Template[] }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {templates.map((template) => (
          <tr key={template.id}>
            <td title={template.id} className="cursor-default">
              {template.name}
            </td>
            <td>{template.description}</td>
            <td>
              <button onClick={() => alert('Delete Template')}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

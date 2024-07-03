import Template from '@core/domain/entities/Template.entity'
import { Form } from 'react-router-dom'

export default function CreateTemplate({
  template,
}: {
  template?: Partial<Template>
}) {
  return (
    <Form
      method={template?.id ? 'put' : 'post'}
      action="/config/templates"
      className="w-[400px] border-dashed border p-4 pt-4 rounded-r-lg shadow-2xl shadow-emerald-500 bg-slate-800 text-slate-400"
    >
      <h1 className="font-semibold text-sm text-slate-500 select-none">
        Create Template Form
      </h1>
      <div className="flex flex-col gap-1">
        <label htmlFor="name" className="w-full">
          Name
        </label>
        <input type="text" name="name" defaultValue={template?.name || ''} />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          defaultValue={template?.description || ''}
        />
      </div>
      <div className="flex flex-row w-full justify-evenly">
        <button type="submit">Create</button>
        <button type="reset">Reset</button>
      </div>
    </Form>
  )
}

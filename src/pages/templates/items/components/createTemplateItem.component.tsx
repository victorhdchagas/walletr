import ErrorAtom from '@components/atoms/labels/error.atom'
import TemplateItem from '@core/domain/entities/TemplateItem.entity'
import { useEffect } from 'react'
import { Form, useActionData, useNavigate, useParams } from 'react-router-dom'

export default function CreateTemplateItem({
  templateItem,
  fields = [],
}: {
  fields: string[]
  templateItem?: Partial<TemplateItem>
}) {
  const navigate = useNavigate()
  const params = useParams()
  const action = templateItem?.id ? 'Edit' : 'Create'

  const actionData = useActionData() as
    | { error?: string; message?: string }
    | undefined
  useEffect(() => {
    if (actionData?.message) navigate(-1)
  }, [actionData, navigate])

  return (
    <Form
      method={templateItem?.id ? 'put' : 'post'}
      action={`/config/templates/${params.id}/items/${
        templateItem?.id || 'create'
      }`}
      className="w-[400px] border-dashed border p-4 pt-4 rounded-r-lg shadow-2xl shadow-emerald-500 bg-slate-800 text-slate-400"
    >
      <h1 className="font-semibold text-sm text-slate-500 select-none">
        {action} Template Item Form
      </h1>
      <div className="flex flex-col gap-1">
        <label htmlFor="name" className="w-full">
          Name
        </label>
        <input
          type="text"
          name="name"
          defaultValue={templateItem?.originName || ''}
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="description">Description</label>
        <select name="targetName" defaultValue={templateItem?.targetName}>
          {fields
            .map((field) => field.split(':'))
            .map(([label, field]) => (
              <option value={field} key={field}>
                {label}
              </option>
            ))}
        </select>
      </div>
      <input type="hidden" name="id" defaultValue={templateItem?.id} />
      <ErrorAtom>{actionData?.error}</ErrorAtom>
      <div className="flex flex-row w-full justify-evenly">
        <button type="submit">{action}</button>
        <button type="reset">Reset</button>
      </div>
    </Form>
  )
}

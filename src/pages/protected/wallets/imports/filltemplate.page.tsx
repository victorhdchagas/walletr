import SessionHeaderMolecule from '@components/molecules/sessionHeader.molecule'
import Template from '@core/domain/entities/Template.entity'
import Wallet from '@core/domain/entities/Wallet.entity'
import { formatBytes } from '@lib/utils'
import Papa, { ParseResult } from 'papaparse'
import { useEffect, useState } from 'react'
import {
  useActionData,
  useLoaderData,
  useLocation,
  useSubmit,
} from 'react-router-dom'
import ImportWarningComponent from './components/ImportWarning.component'
import TableComponent, { RawTemplateItem } from './components/Table.component'
import TemplateItem from '@core/domain/entities/TemplateItem.entity'
import { ToastIt } from '@components/nativeComponent/toastSuccess'

function formatData(
  data: { [key: string]: string }[],
  templates: TemplateItem[],
): RawTemplateItem[] {
  const toReturn: RawTemplateItem[] = []
  data.forEach((item) => {
    const toAppend: RawTemplateItem = {
      name: '',
      price: '',
      _target: '',
      category: '',
      description: '',
      createdAt: '',
    }
    templates.forEach((template) => {
      toAppend[
        template.targetName as
          | 'name'
          | 'price'
          | '_target'
          | 'description'
          | 'createdAt'
      ] = item[template.originName.toLowerCase()]
    })

    // Object.keys(item).forEach((key) => {
    //   if (key && key.length > 0) {
    //     toAppend[key] = item[key]
    //   }
    // })
    toReturn.push(toAppend)
  })

  return toReturn
}

export default function FillTemplatePage() {
  const actionData = useActionData() as
    | { error?: string; message?: string }
    | undefined
  const pathname = useLocation().pathname
  const [file, setFile] = useState<File | null>(null)
  const submit = useSubmit()

  const [data, setData] = useState<RawTemplateItem[]>([])
  const loader = useLoaderData() as {
    template: Template
    itemmap: string[]
    wallet: Wallet
  }
  function onChangeFile(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault()
    const _file = e.target.files?.[0]
    if (!_file) return
    setFile(_file)
  }
  useEffect(() => {
    if (actionData) {
      if ('error' in actionData) {
        console.error(actionData.error)
      }
      if (actionData.message) {
        ToastIt({ data: actionData.message, options: { success: true } })
        console.log(actionData.message)
      }
    }
  }, [actionData])

  useEffect(() => {
    if (file) {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
      Papa.parse(file, {
        // preview: 5,
        header: true,
        transform: (value: string) => {
          if (value.length > 0) return value.trim().toLowerCase()
        },
        complete: async function (
          results: ParseResult<{ [key: string]: string }>,
        ) {
          const dataLowercase = JSON.parse(
            JSON.stringify(results.data).toLowerCase(),
          )
          const formattedData = formatData(dataLowercase, loader.template.items)
          setData(formattedData)

          //   for (const slice of toAsync) {
          // Devo criar uma rota pra verificar na API se ja tem registros para esse usuario com cada lançamento (enviando de 5 em 5)
          const formData = new FormData()

          formData.append('file', JSON.stringify(formattedData))
          submit(formData, {
            method: 'PATCH',
            action: pathname,
            //   headers: {
            //     'Content-Type': 'application/json',
            //   },
          })
          //   }
        },
        error: (error: string) => {
          console.error(error)
        },
      })
    }
  }, [file, pathname])
  return (
    <section className="overflow-y-auto h-full flex flex-col gap-4 relative">
      <SessionHeaderMolecule
        title={`${loader.template.name} -> ${loader.wallet.name}`}
      ></SessionHeaderMolecule>
      <span className="text-xs pb-4">{`Importando ${loader.template.name} na carteira ${loader.wallet.name}`}</span>
      {file !== null && (
        <div
          title="file info"
          className="flex flex-col gap-2 justify-start w-64 text-sm border-dashed border rounded-lg p-2 bg-slate-800 absolute top-10 right-4 select-none "
        >
          <span className="absolute top-0 right-0 bg-slate-800 border-b border-l p-0.5 rounded-lg px-2 pt-2">
            {file.type}
          </span>
          <span className="w-full">{file.name}</span>
          <div className="inline-flex justify-between">
            <span>qtd: {data.length}</span>
            <span>{formatBytes(file?.size)}</span>
          </div>
          <span className="italic text-right">
            {new Date(file.lastModified).toLocaleString()}
          </span>
        </div>
      )}
      <input type="file" accept="text/csv" onChange={onChangeFile} />

      <div>
        <ImportWarningComponent
          templateId={loader.template.id}
          itemmap={loader.itemmap}
          templateItems={loader.template.items}
        />
      </div>
      <TableComponent data={data} />
    </section>
  )
}

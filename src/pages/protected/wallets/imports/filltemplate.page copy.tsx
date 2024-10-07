import { CheckboxListItemAtomProps } from '@components/atoms/inputs/checkboxItem.atom'
import SessionHeaderMolecule from '@components/molecules/sessionHeader.molecule'
import Template from '@core/domain/entities/Template.entity'
import Wallet from '@core/domain/entities/Wallet.entity'
import { formatBytes } from '@lib/utils'
import Papa, { ParseResult } from 'papaparse'
import { useEffect, useState } from 'react'
import { useLoaderData, useLocation } from 'react-router-dom'
import ImportWarningComponent from './components/ImportWarning.component'
import TableComponent from './components/Table.component'

function formatData(data: { [key: string]: string | number }[]) {
  const toReturn: { [key: string]: string | number }[] = []
  data.forEach((item) => {
    const toAppend: { [key: string]: string | number } = {}
    Object.keys(item).forEach((key) => {
      if (key && key.length > 0) {
        toAppend[key] = item[key]
      }
    })
    toReturn.push(toAppend)
  })

  return toReturn
}

export default function FillTemplatePage() {
  const pathname = useLocation().pathname
  const [file, setFile] = useState<File | null>(null)
  const [headers, setHeaders] = useState<CheckboxListItemAtomProps[]>([])
  const [data, setData] = useState<{ [key: string]: string | number }[]>([])
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
    if (file) {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
      Papa.parse(file, {
        // preview: 5,
        header: true,
        transform: (value: string) => {
          if (value.length > 0) return value.trim()
        },
        complete: async function (
          results: ParseResult<{ [key: string]: string | number }>,
        ) {
          const headers = results.data[0]

          setHeaders(
            Object.keys(headers)
              .filter((v) => v.length > 0)
              .map((value) => ({
                checked: true,
                label: value,
              })),
          )
          setData(formatData(results.data))
          const toSplice = results.data.slice(0)
          const toAsync = toSplice.reduce(
            (acc, _a, _b, arr) => {
              return [...acc, arr.splice(0, 5)]
            },
            [] as {
              [key: string]: string | number
            }[][],
          )
          if (toSplice.length > 0) toAsync.push(toSplice)
          console.log(pathname)
          for await (const slice of toAsync) {
            // Devo criar uma rota pra verificar na API se ja tem registros para esse usuario com cada lançamento (enviando de 5 em 5)
            const response = await fetch(pathname, {
              method: 'PATCH',
              body: JSON.stringify(slice),
              headers: {
                'Content-Type': 'application/json',
              },
            }).then(console.log)
            console.log(response)
          }
        },
        error: (error: string) => {
          console.log(error)
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

      <div className="hidden">
        {loader.template.items
          .filter((item) =>
            headers.map((i) => i.label).includes(item.originName),
          )
          .map((item) => (
            <div key={item.id}>{item.originName}</div>
          ))}
      </div>
      <div>
        <ImportWarningComponent
          templateId={loader.template.id}
          itemmap={loader.itemmap}
          templateItems={loader.template.items}
        />
      </div>
      <TableComponent headers={headers} data={data} />
    </section>
  )
}

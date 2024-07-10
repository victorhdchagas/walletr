import { CheckboxListItemAtomProps } from '@components/atoms/inputs/checkboxItem.atom'
import WarningAtom from '@components/atoms/labels/warning.atom'
import SessionHeaderMolecule from '@components/molecules/sessionHeader.molecule'
import Template from '@core/domain/entities/Template.entity'
import Wallet from '@core/domain/entities/Wallet.entity'
import { formatBytes } from '@lib/utils'
import Papa, { ParseResult } from 'papaparse'
import { useEffect, useState } from 'react'
import { Link, useLoaderData } from 'react-router-dom'

export default function FillTemplatePage() {
  const [file, setFile] = useState<File | null>(null)
  const [headers, setHeaders] = useState<CheckboxListItemAtomProps[]>([])
  const [data, setData] = useState<string[][]>([])
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
        transform: (value: string) => {
          if (value.length > 0) return value.trim()
        },
        header: true,
        complete: function (results: ParseResult<string[]>) {
          const headers = results.data.splice(0, 1)
          console.log(headers)
          setHeaders(
            Object.keys(headers).map((value) => ({
              checked: true,
              label: value,
            })),
          )
          setData(results.data)
          console.log(JSON.stringify(results.data))
        },
        error: (error: string) => {
          console.log(error)
        },
      })
    }
  }, [file])
  return (
    <section className="overflow-y-auto h-full flex flex-col gap-2 relative">
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
            {file?.type}
          </span>
          <span className="w-full">{file?.name}</span>
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
        {loader.template.items
          .filter((item) =>
            headers.map((i) => i.label).includes(item.originName),
          )
          .map((item) => (
            <div key={item.id}>{item.originName}</div>
          ))}
      </div>
      <div>
        {loader.template.items.length > 0 &&
          loader.template.items.length !== loader.itemmap.length && (
            <WarningAtom>
              Template incompleto, considere{' '}
              <Link
                to={`/config/templates/${loader.template.id}/items`}
                className="underline font-semibold hover:animate-pulse"
              >
                ajustar
              </Link>{' '}
              a importação
              {loader.itemmap
                .map((item) => item.split(':')[1])
                .filter(
                  (item) =>
                    !loader.template.items.some((i) => i.targetName === item),
                )
                .map(
                  (item) =>
                    loader.itemmap
                      .find((i) => i.split(':')[1] === item)
                      ?.split(':')[0],
                )
                .map((item) => (
                  <div key={item} className="text-lime-900">
                    - {item}
                  </div>
                ))}
            </WarningAtom>
          )}
      </div>
    </section>
  )
}

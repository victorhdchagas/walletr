import { useEffect, useState } from 'react'
import Papa, { ParseResult } from 'papaparse'
import mockedFile from '../mock/file.json'
import CheckboxListAtom, {
  CheckboxListItemAtomProps,
} from './atoms/inputs/checkboxList'
import { useFileContext } from '../context/useFileContext'
import CheckboxItemAtom from './atoms/inputs/checkboxItem.atom'

export default function CSVViewer() {
  const { file, parserConfig } = useFileContext()
  const [headers, setHeaders] = useState<CheckboxListItemAtomProps[]>(
    mockedFile[0].map((value) => ({ checked: false, label: value })),
  )
  const [systemHeaders, setSystemHeaders] = useState<
    CheckboxListItemAtomProps[]
  >(
    [
      'date',
      'category',
      'origin',
      'steps',
      'value',
      'owner',
      'payer',
      'paid',
    ].map((value) => ({ checked: false, label: value })),
  )
  const [data, setData] = useState<string[][]>(mockedFile)
  const [isPreviewing, setIsPreviewing] = useState(false)
  useEffect(() => {
    if (file) {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
      Papa.parse(file, {
        preview: isPreviewing ? 5 : undefined,
        transform: (value: string) => {
          if (value.length > 0) return value.trim()
        },
        header: parserConfig?.includeHeaders,
        complete: function (results: ParseResult<string[]>) {
          const headers = results.data[0]
          setHeaders(headers.map((value) => ({ checked: true, label: value })))
          setData(results.data)
          console.log(JSON.stringify(results.data))
        },
        error: (error: string) => {
          console.log(error)
        },
      })
    }
  }, [file, isPreviewing, parserConfig])

  return (
    <div className="flex flex-col w-full max-h-[400px] overflow-y-auto p-4">
      {/* <input
        type="checkbox"
        onChange={(e) =>
          setParserConfig({ ...parserConfig, includeHeaders: e.target.checked })
        }
      /> */}

      <div className="flex w-full flex-row justify-between">
        {headers && headers.length > 0 && (
          <CheckboxListAtom>
            {headers.map((item, index) => (
              <CheckboxItemAtom key={index} item={item} index={`${index}`} />
            ))}
          </CheckboxListAtom>
        )}
        {systemHeaders && systemHeaders.length > 0 && (
          <CheckboxListAtom>
            {systemHeaders.map((item, index) => (
              <CheckboxItemAtom key={index} item={item} index={`${index}`} />
            ))}
          </CheckboxListAtom>
        )}
      </div>

      <div>
        {data?.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="grid "
            style={{
              gridTemplateColumns: `repeat(${
                headers ? headers.length : 1
              }, minmax(0, 1fr))`,
            }}
          >
            {row
              .filter((_, index) => headers?.[index]?.checked)
              .map((cell, index) => (
                <p className="text-wrap break-words" key={index}>
                  {cell}
                </p>
              ))}
          </div>
        ))}
      </div>
    </div>
  )
}

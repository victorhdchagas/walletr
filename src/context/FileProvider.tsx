import { PropsWithChildren, createContext, useState } from 'react'
import { PreConfigCSVParser } from '../lib/PreConfigCsvParserProtocol'

export type FileContext = {
  file?: File
  setFile: (file: File) => void
  resetFile: () => void
  parserConfig?: PreConfigCSVParser
  setParserConfig: (config: PreConfigCSVParser) => void
}

const initialContext: FileContext = {
  setFile: () => {},
  resetFile: () => {},
  setParserConfig: () => {},
  parserConfig: undefined,
}
export const FileContext = createContext<FileContext>(initialContext)

export default function FileProvider({ children }: PropsWithChildren) {
  const [file, setFile] = useState<File | undefined>()
  const [parserConfig, setParserConfig] = useState<
    PreConfigCSVParser | undefined
  >(undefined)
  const resetFile = () => setFile(undefined)

  return (
    <FileContext.Provider
      value={{ setFile, file, resetFile, parserConfig, setParserConfig }}
    >
      {children}
    </FileContext.Provider>
  )
}

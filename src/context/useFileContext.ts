import { useContext } from 'react'
import { FileContext } from './FileProvider'

export function useFileContext() {
  return useContext(FileContext)
}

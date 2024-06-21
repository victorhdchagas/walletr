import React from 'react'
import { useFileContext } from '../../../context/useFileContext'

interface InputFileAtomProps extends React.PropsWithChildren {}
export default function InputFileAtom({ children }: InputFileAtomProps) {
  const { setFile } = useFileContext()

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0]
    if (uploadedFile) {
      setFile(uploadedFile)
    }
  }

  return (
    <div>
      {!children && (
        <label htmlFor="file-upload" className="btn btn-ghost btn-xs">
          Enviar arquivo
        </label>
      )}
      {children && children}
      <input
        type="file"
        id="file-upload"
        className=" hidden"
        accept={'.csv'}
        onChange={handleFileUpload}
      />
    </div>
  )
}

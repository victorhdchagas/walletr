import React from 'react'
import FileProvider from './FileProvider'
import UseCasesProvider from './useCases.provider'

export default function Providers({ children }: React.PropsWithChildren) {
  return (
    <FileProvider>
      <UseCasesProvider>{children}</UseCasesProvider>
    </FileProvider>
  )
}

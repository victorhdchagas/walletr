import { ContextUseCases, myUseCases } from './useCases.context'

export default function UseCasesProvider({
  children,
}: React.PropsWithChildren) {
  return (
    <ContextUseCases.Provider value={myUseCases}>
      {children}
    </ContextUseCases.Provider>
  )
}

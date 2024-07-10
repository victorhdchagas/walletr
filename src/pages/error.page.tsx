import { useEffect, useState } from 'react'
import {
  Link,
  isRouteErrorResponse,
  useNavigate,
  useRouteError,
} from 'react-router-dom'

export default function ErrorPage() {
  const error = useRouteError()
  const navigate = useNavigate()
  const [cause, setCause] = useState<string | null>(null)
  const [trace, setTrace] = useState<string | undefined | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  useEffect(() => {
    setCause(
      isRouteErrorResponse(error)
        ? error.statusText
        : error instanceof Error
        ? error.name
        : null,
    )

    setTrace(error instanceof Error ? error.stack : null)
    setMessage(
      isRouteErrorResponse(error)
        ? error.data
        : error instanceof Error
        ? error.message
        : typeof error === 'string'
        ? error
        : 'Ocorreu um erro.',
    )
    console.error(error)
  }, [error])
  return (
    <div className="bg-slate-800 text-emerald-600 min-h-screen flex flex-col items-start justify-center overflow-auto">
      <h1 className="text-5xl font-bold">Oh não, algo deu errado!</h1>
      <p className="text-2xl mt-5">Ocorreu um erro inesperado.</p>
      <p className="text-lg">Código de erro: {cause}</p>
      <pre>Message: {JSON.stringify(message, null, 2)}</pre>
      <pre className="w-full  h-80 border-dashed">{trace}</pre>
      <div className="w-full flex flex-row justify-center gap-2">
        <Link
          to="/"
          className="bg-black text-white px-4 py-2 rounded mt-5 hover:bg-opacity-50 transition-all"
        >
          Voltar para Página Inicial
        </Link>
        <div
          className="group/bback cursor-pointer flex justify-center bg-emerald-800 text-emerald-400  w-32 px-4 py-2 rounded mt-5 hover:bg-opacity-50 transition-all"
          onClick={() => navigate(-1)}
        >
          <span className="group-hover/bback:animate-bounce">Voltar</span>
        </div>
      </div>
    </div>
  )
}

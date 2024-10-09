import { ReactNode, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'

export default function SearchMolecule({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLFormElement>(null)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setSearchParams] = useSearchParams()

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const keys = Object.fromEntries(new FormData(e.currentTarget)) as {
      [key: string]: string
    }
    for (const key in keys) {
      if (keys[key] === '') delete keys[key]
    }
    setSearchParams(keys)
  }

  return (
    <form ref={ref} onSubmit={onSubmit}>
      {children}
      <button type="submit">Search</button>
    </form>
  )
}

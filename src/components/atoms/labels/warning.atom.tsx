import { ExclamationMark } from '@phosphor-icons/react'
import { useState } from 'react'
import { twMerge } from 'tailwind-merge'

export default function WarningAtom({
  children,
  enableMinimize = true,
}: React.PropsWithChildren<{ enableMinimize?: boolean }>) {
  const [minimized, setMinimized] = useState(false)
  return (
    <div
      title="Warning box"
      className="bg-lime-300 hover:bg-lime-400 select-none rounded-lg shadow p-4 relative group/warning"
    >
      {!minimized && (
        <>
          <div className="text-slate-800">{children}</div>
          <ExclamationMark
            size={32}
            color="#1ce62e"
            weight="thin"
            className="absolute rounded-full border border-emerald-400 transition-all group-hover/warning:border-emerald-800 top-1/2 right-3 -translate-y-1/2  animation-pulse fill-emerald-400 group-hover/warning:fill-emerald-900 "
          />
        </>
      )}
      {enableMinimize && (
        <button
          onClick={() => setMinimized(!minimized)}
          className={twMerge(
            'absolute top-1 right-1  text-emerald-800 rounded-2xl px-1.5 border-b border-dashed shadow-md shadow-emerald-800 hover:text-emerald-900 hover:shadow-emerald-600 transition-all',
            minimized
              ? 'w-full flex flex-1 border-b-0 shadow-none text-lime-300 hover:text-lime-400 transition-none'
              : '',
          )}
        >
          {minimized ? ' Ver mais' : 'Ver menos'}
        </button>
      )}
    </div>
  )
}

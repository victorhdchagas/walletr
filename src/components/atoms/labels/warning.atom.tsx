import { ExclamationMark } from '@phosphor-icons/react'

export default function WarningAtom({ children }: React.PropsWithChildren) {
  return (
    <div
      title="Warning box"
      className="bg-lime-300 hover:bg-lime-400 select-none rounded-lg shadow p-4 relative group/warning"
    >
      <div className="text-slate-800">{children}</div>
      <ExclamationMark
        size={32}
        color="#1ce62e"
        weight="thin"
        className="absolute rounded-full border border-emerald-400 transition-all group-hover/warning:border-emerald-800 top-3 right-2  animation-pulse fill-emerald-400 group-hover/warning:fill-emerald-900 "
      />
    </div>
  )
}

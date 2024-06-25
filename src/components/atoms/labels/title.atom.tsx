import React from 'react'

export default function TitleAtom({
  children,
  className,
}: React.PropsWithChildren<{ className?: string }>) {
  return (
    <span
      className={'text-lg text-emerald-400 font-semibold font-sans'.concat(
        className ?? '',
      )}
    >
      {children}
    </span>
  )
}

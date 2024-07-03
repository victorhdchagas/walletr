import React from 'react'

export default function ErrorAtom({
  children,
  className,
}: React.PropsWithChildren<{ className?: string }>) {
  return (
    <span
      className={'text-lg text-red-400 font-semibold font-sans '.concat(
        className ?? '',
      )}
    >
      {children}
    </span>
  )
}

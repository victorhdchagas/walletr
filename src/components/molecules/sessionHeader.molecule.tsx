import TitleAtom from '@components/atoms/labels/title.atom'
import React from 'react'
import { twMerge } from 'tailwind-merge'

export default function SessionHeaderMolecule({
  children,
  title,
  className,
}: React.PropsWithChildren<{ className?: string; title: string }>) {
  return (
    <div
      className={twMerge(
        'flex flex-row justify-between items-center border-b border-dotted',
        className,
      )}
    >
      <TitleAtom className="w-full text-2xl font-semibold">{title}</TitleAtom>
      {children}
    </div>
  )
}

import TitleAtom from '@components/atoms/labels/title.atom'
import React from 'react'

export default function PageTitleMolecule({
  children,
}: React.PropsWithChildren) {
  return (
    <div className="flex justify-center items-center pb-2 border-dashed border-b border-slate-500">
      <TitleAtom>{children}</TitleAtom>
    </div>
  )
}

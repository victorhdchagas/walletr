import PortalAtom, {
  PortalAtomProps,
} from '@components/atoms/portals/portal.atom'
import React from 'react'
import { twMerge } from 'tailwind-merge'

export default function PortalMolecule({
  children,
  visible = false,
  onClose,
  closeOnEscape = true,
}: React.PropsWithChildren<{
  visible: boolean
  onClose?: () => void
  closeOnEscape?: boolean
}>) {
  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      onClose?.()
    }
  }
  const listeners: PortalAtomProps['eventListeners'] | undefined = closeOnEscape
    ? [{ name: 'keydown', handler: onKeyDown }]
    : undefined
  return (
    <PortalAtom eventListeners={listeners}>
      <div
        className={twMerge(
          'fixed flex flex-col bg-black bg-opacity-40 h-screen w-screen top-0 left-0 z-10 justify-center items-center backdrop-blur-sm',
          visible ? 'visible' : 'invisible',
        )}
      >
        <div className="w-fit h-fit bg-white rounded-lg relative">
          {onClose && (
            <button
              className="absolute top-1 right-1 text-white rounded-2xl px-1.5 border-b border-dashed shadow-md shadow-emerald-800 hover:text-emerald-200 hover:shadow-emerald-600 transition-all"
              onClick={onClose}
            >
              X
            </button>
          )}
          {children}
        </div>
      </div>
    </PortalAtom>
  )
}

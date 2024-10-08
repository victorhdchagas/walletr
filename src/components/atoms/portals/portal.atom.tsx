import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

export interface PortalAtomProps {
  children: React.ReactNode
  eventListeners?: {
    name: 'keydown'
    handler: (ev: DocumentEventMap['keydown']) => unknown
  }[]
}

export default function PortalAtom({
  children,
  eventListeners,
}: PortalAtomProps) {
  const [element, setElement] = useState<HTMLElement | null>(null)
  useEffect(() => {
    const element = document.createElement('div')
    const newPortalId = crypto
      .getRandomValues(new Uint32Array(1))[0]
      .toString(10)
    element.setAttribute('id', newPortalId)
    setElement(element)

    eventListeners?.forEach(({ name, handler }) => {
      document.addEventListener(name, handler)
    })
    document.body.appendChild(element)
    return () => {
      document.body.removeChild(element)

      eventListeners?.forEach(({ name, handler }) => {
        document.removeEventListener(name, handler)
      })
    }
  }, [eventListeners])
  if (element) return createPortal(children, element)
  return null
}

import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

export default function PortalAtom({ children }: React.PropsWithChildren) {
  const [element, setElement] = useState<HTMLElement | null>(null)
  useEffect(() => {
    const element = document.createElement('div')
    const newPortalId = crypto
      .getRandomValues(new Uint32Array(1))[0]
      .toString(10)
    element.setAttribute('id', newPortalId)
    setElement(element)
    document.body.appendChild(element)
    return () => {
      document.body.removeChild(element)
    }
  }, [])
  if (element) return createPortal(children, element)
  return null
}

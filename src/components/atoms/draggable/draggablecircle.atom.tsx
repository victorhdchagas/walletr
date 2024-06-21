import { useEffect, useRef } from 'react'

export default function DraggableCircleAtom() {
  const divRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (divRef && divRef.current)
      divRef.current.ondragend = (e) => {
        if (e.type === 'dragend') console.log(e)
      }

    return () => {
      if (divRef.current) divRef.current.ondragend = null
    }
  }, [divRef])
  return (
    <div
      draggable
      className="h-4 w-4 rounded-full border bg-slate-400"
      ref={divRef}
    ></div>
  )
}

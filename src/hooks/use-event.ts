import { useEffect, useRef } from 'react'

export const useEvent = <T extends keyof WindowEventMap>(
  event: T,
  handler: (event: WindowEventMap[T]) => void,
  active = true,
) => {
  const handlerRef = useRef(handler)

  handlerRef.current = handler

  useEffect(() => {
    if (active) {
      const handle = (event: WindowEventMap[T]) => handlerRef.current(event)

      window.addEventListener(event, handle)

      return () => window.removeEventListener(event, handle)
    }
  }, [active, event])
}

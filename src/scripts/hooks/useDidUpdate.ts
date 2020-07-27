import { useEffect, useRef } from 'react'

type useDidUpdate = (func: () => void, deps: ReadonlyArray<any>) => void

export const useDidUpdate: useDidUpdate = (func, deps) => {
  const firstUpdate = useRef(true)
  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false
    } else {
      func()
    }
  }, deps)
}

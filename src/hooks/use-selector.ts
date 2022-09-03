import { useContext, useEffect, useRef, useState } from 'react';
import { StoreContext } from '../utils/store-context';
import { State } from '../utils/state';

export const useSelector = <T>(fn: (state: State) => T) => {
  const { getState, subscribe } = useContext(StoreContext)
  const [value, setValue] = useState(() => fn(getState()))
  const fnRef = useRef(fn)

  fnRef.current = fn

  useEffect(() => subscribe(state => {
    setValue(() => fnRef.current(state))
  }), [subscribe])

  return value
}

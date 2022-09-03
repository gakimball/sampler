import React, { useMemo, useRef } from 'react'
import { State } from './state'

type StateListener = (state: State) => void

interface StoreContextValue {
  getState: () => State;
  subscribe: (cb: StateListener) => () => void;
  updateState: (cb: (currentState: State) => (State | void)) => void;
}

export const StoreContext = React.createContext<StoreContextValue>({
  getState: () => new State(),
  subscribe: () => () => {},
  updateState: () => {},
})

interface StoreProviderProps {
  children: React.ReactNode;
}

export const StoreProvider: React.FC<StoreProviderProps> = ({
  children,
}) => {
  const state = useRef(new State())
  const listeners = useRef(new Set<StateListener>())

  const contextValue = useMemo<StoreContextValue>(() => ({
    getState: () => state.current,
    subscribe: cb => {
      listeners.current.add(cb)

      return () => listeners.current.delete(cb)
    },
    updateState: cb => {
      const nextState = cb(state.current)

      if (nextState) {
        console.log({ nextState })

        state.current = nextState
        listeners.current.forEach(fn => fn(state.current))
      }
    },
  }), [])

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  )
}

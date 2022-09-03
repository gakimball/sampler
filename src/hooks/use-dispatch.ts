import { useContext } from 'react'
import { StoreContext } from '../utils/store-context'

export const useDispatch = () => useContext(StoreContext).updateState

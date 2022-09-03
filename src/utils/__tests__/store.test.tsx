import { renderHook, act } from '@testing-library/react'
import { useDispatch } from '../../hooks/use-dispatch'
import { useSelector } from '../../hooks/use-selector'

test('re-renders for state updates', () => {
  const { result } = renderHook(() => [
    useSelector(state => state.isRecording),
    useDispatch(),
  ] as const)
  const dispatch = result.current[1]

  act(() => {
    dispatch(state => state.startRecording())
  })

  const value = result.current[0]

  expect(value).toBe(true)
})

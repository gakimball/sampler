import { useDispatch } from '../hooks/use-dispatch'
import { useSelector } from '../hooks/use-selector'

export const RecordButton = () => {
  const isRecording = useSelector(state => state.isRecording)
  const dispatch = useDispatch()

  if (isRecording) {
    return null
  }

  return (
    <button
      className="btn btn-md btn-primary"
      onClick={() => dispatch(state => state.startRecording())}
    >
      Record sample
    </button>
  )
}

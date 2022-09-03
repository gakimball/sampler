import { useEffect, useRef } from 'react'
import { useDispatch } from '../hooks/use-dispatch';
import { useSelector } from '../hooks/use-selector';

export const Recorder: React.FC= () => {
  const recorderRef = useRef<MediaRecorder>()

  const isRecording = useSelector(state => state.isRecording)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!isRecording) {
      return
    }

    navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
      // Bind the incoming audio stream to a recording interface
      const recorder = new MediaRecorder(stream)
      const dataArray: Blob[] = []

      // Copy audio data as it comes in
      recorder.ondataavailable = event => dataArray.push(event.data)

      // When the recording is done, copy it to the playback <audio> element
      recorder.onstop = () => dispatch(state => state.stopRecording(dataArray))

      recorderRef.current = recorder
      recorder.start()
    })
  }, [dispatch, isRecording])

  if (!isRecording) {
    return null
  }

  return (
    <button
      type="button"
      className="btn btn-danger"
      onClick={() => recorderRef.current?.stop()}
    >
      Stop recording
    </button>
  )
}

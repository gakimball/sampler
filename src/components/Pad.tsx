import React, { useContext } from 'react'
import { useDispatch } from '../hooks/use-dispatch';
import { useSelector } from '../hooks/use-selector';
import { AudioContext } from '../utils/audio-context';

export const Pad: React.FC = () => {
  const bindings = useSelector(state => state.padBindings)
  const assigningKey = useSelector(state => state.assigningKey)
  const dispatch = useDispatch()
  const { playNote } = useContext(AudioContext)

  return (
    <div>
      {Array.from({ length: 16 }, (_, index) => {
        const num = index + 1
        const binding = bindings[num]
        const isSet = binding !== undefined

        return (
          <React.Fragment key={num}>
            <div className="mb-2" style={{ display: 'inline-block', width: '50px' }}>
              <button
                type="button"
                onClick={() => {
                  if (assigningKey) {
                    dispatch(state => state.assignPadButton(num, assigningKey))
                  } else if (isSet) {
                    playNote(binding.sampleId, binding.tone)
                  }
                }}
                className={`btn btn-${isSet ? 'primary' : 'secondary'}`}
              >
                {num}
              </button>
            </div>
            {num % 4 === 0 && (
              <br />
            )}
          </React.Fragment>
        )
      })}
      {assigningKey && (
        <p>Assigning {assigningKey.sampleId} {assigningKey.label}</p>
      )}
    </div>
  )
}

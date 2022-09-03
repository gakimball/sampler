import React, { useContext, useState } from 'react'
import { useDispatch } from '../hooks/use-dispatch';
import { useEvent } from '../hooks/use-event';
import { useSelector } from '../hooks/use-selector';
import { AudioContext } from '../utils/audio-context';
import { KeyDefinition } from '../utils/constants'

interface PitchButtonProps extends KeyDefinition {
  sampleId: number;
}

export const PitchButton: React.FC<PitchButtonProps> = ({
  label,
  sampleId,
  tone,
  useKey,
}) => {
  const isActive = useSelector(state => state.activeSample === sampleId)
  const isCenter = useSelector(state => state.samples[sampleId].center === tone)
  const dispatch = useDispatch()

  const { playNote } = useContext(AudioContext)
  const [pressed, setPressed] = useState(false)

  useEvent('keydown', event => {
    if (event.key === useKey) {
      setPressed(true)
      playNote(sampleId, tone)
    }
  }, isActive)

  useEvent('keyup', event => {
    if (event.key === useKey) {
      setPressed(false)
    }
  }, isActive)

  const buttonColor = (() => {
    if (!isActive) {
      return 'secondary'
    }

    if (isCenter) {
      return 'success'
    }

    return 'warning'
  })()

  return (
    <span
      style={{
        position: 'relative',
        top: pressed ? '2px' : undefined,
      }}
    >
      <button
        className={`btn btn-md btn-${buttonColor}`}
        onClick={() => playNote(sampleId, tone)}
        onContextMenu={event => {
          event.preventDefault()
          dispatch(state => state.beginAssigningKey({ sampleId, label, tone, useKey }))
        }}
      >
        {label}
      </button>
    </span>
  )
}

import React, { useContext } from 'react'
import { PitchButton } from './PitchButton'
import { keys } from '../utils/constants'
import { useDispatch } from '../hooks/use-dispatch';
import { useSelector } from '../hooks/use-selector';
import { SampleState } from '../utils/state';
import { AudioContext } from '../utils/audio-context';

interface SampleProps extends SampleState {
  sampleId: number;
}

export const Sample: React.FC<SampleProps> = ({
  center,
  startAt,
  sampleId,
  src,
}) => {
  const { audioRefs } = useContext(AudioContext)
  const isActive = useSelector(state => state.activeSample === sampleId)
  const dispatch = useDispatch()

  return (
    <div
      className="mb-4"
      style={{
        display: 'flex',
        flexFlow: 'row nowrap',
        alignItems: 'flex-end',
      }}
    >
      <audio
        ref={e => {
          if (e) {
            audioRefs.set(sampleId, e)
            e.preservesPitch = false
          }
        }}
        src={src}
      />
      <div className="pb-2" style={{ flexBasis: '20px' }}>
        <input
          className="form-check-input"
          type="checkbox"
          checked={isActive}
          onChange={e => e.target.checked && dispatch(state => state.setActiveSample(sampleId))}
        />
      </div>
      <div style={{ flexBasis: '100px' }}>
        <label className="form-label" htmlFor="startAt">
          Start at
        </label>
        <input
          name="startAt"
          className="form-control"
          type="text"
          value={startAt}
          onChange={e => dispatch(state => state.editSample(sampleId, { startAt: e.target.value }))}
        />
      </div>
      <div style={{ flexBasis: '100px' }}>
        <label className="form-label" htmlFor="center">
          Center
        </label>
        <select
          className="form-select"
          name="center"
          value={center}
          onChange={e => dispatch(state => state.editSample(sampleId, { center: Number.parseInt(e.target.value, 10) }))}
        >
          {keys.map(({ tone, label }) => (
            <option key={tone} value={tone}>{label}</option>
          ))}
        </select>
      </div>
      {keys.map(key => (
        <PitchButton key={key.tone} sampleId={sampleId} {...key} />
      ))}
    </div>
  )
}

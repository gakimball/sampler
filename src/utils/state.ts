import { immerable, produce } from 'immer'
import { KeyDefinition } from './constants';

interface EditableSampleState {
  startAt: string;
  center: number;
}

export interface SampleState extends EditableSampleState {
  src: string;
}

export interface AssigningKeyState extends KeyDefinition {
  sampleId: number;
}

export interface PadBindingState {
  sampleId: number;
  tone: number;
}

export class State {
  [immerable] = true
  isRecording = false
  samples: {
    [id: number]: SampleState;
  } = {}
  activeSample?: number
  assigningKey?: AssigningKeyState
  padBindings: {
    [num: number]: PadBindingState | undefined;
  } = {}

  startRecording() {
    return produce(this, draft => {
      draft.isRecording = true
    })
  }

  stopRecording(audioBlob: Blob[]) {
    const nextId = Object.keys(this.samples).length + 1

    return produce(this, draft => {
      draft.isRecording = false
      draft.samples[nextId] = {
        src: URL.createObjectURL(
          new Blob(audioBlob, { type: 'audio/mp3' })
        ),
        startAt: '0',
        center: 48,
      }
      draft.activeSample = nextId
    })
  }

  setActiveSample(sampleId: number) {
    return produce(this, draft => {
      draft.activeSample = sampleId
    })
  }

  editSample(sampleId: number, props: Partial<EditableSampleState>) {
    return produce(this, draft => {
      if (sampleId in draft.samples) {
        Object.assign(draft.samples[sampleId], props)
      }
    })
  }

  beginAssigningKey(key: AssigningKeyState) {
    return produce(this, draft => {
      draft.assigningKey = key
    })
  }

  assignPadButton(buttonId: number, key: AssigningKeyState) {
    return produce(this, draft => {
      draft.padBindings[buttonId] = {
        sampleId: key.sampleId,
        tone: key.tone,
      }
      draft.assigningKey = undefined
    })
  }
}

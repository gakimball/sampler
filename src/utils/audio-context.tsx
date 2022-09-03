import React, { useContext, useMemo, useRef } from 'react'
import { StoreContext } from './store-context'

export type AudioMap = Map<number, HTMLAudioElement>

interface AudioContextValue {
  audioRefs: AudioMap;
  playNote: (sampleId: number, tone: number) => void;
}

export const AudioContext = React.createContext<AudioContextValue>({
  audioRefs: new Map(),
  playNote: () => {},
})

interface AudioProviderProps {
  children: React.ReactNode;
}

export const AudioProvider: React.FC<AudioProviderProps> = ({
  children,
}) => {
  const { getState } = useContext(StoreContext)
  const audioRefs = useRef<AudioMap>(new Map())

  const contextValue = useMemo<AudioContextValue>(() => ({
    audioRefs: audioRefs.current,
    playNote: (sampleId, tone) => {
      const sample = getState().samples[sampleId]
      const audioElement = audioRefs.current.get(sampleId)

      audioElement!.pause()
      audioElement!.playbackRate = 2 ** ((tone - sample.center) / 12)
      audioElement!.currentTime = Number.parseInt(sample.startAt, 10) / 1000
      audioElement!.play()
    },
  }), [getState])

  return (
    <AudioContext.Provider value={contextValue}>
      {children}
    </AudioContext.Provider>
  )
}

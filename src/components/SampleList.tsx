import { useSelector } from '../hooks/use-selector'
import { Sample } from './Sample'

export const SampleList = () => {
  const samples = useSelector(state => state.samples)

  return (
    <>
      {Object.entries(samples).map(([id, sample]) => (
        <Sample key={id} sampleId={Number.parseInt(id, 10)} {...sample} />
      ))}
    </>
  )
}

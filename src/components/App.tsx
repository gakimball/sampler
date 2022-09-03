import { Pad } from './Pad';
import { RecordButton } from './RecordButton';
import { Recorder } from './Recorder'
import { SampleList } from './SampleList';
import { AudioProvider } from '../utils/audio-context';
import { StoreProvider } from '../utils/store-context';

function App() {
  return (
    <StoreProvider>
      <AudioProvider>
        <div className="text-bg-dark pt-4" style={{ minHeight: '100vh' }}>
          <div className="container">
            <SampleList />
            <Recorder />
            <RecordButton />
            <br />
            <br />
            <Pad />
          </div>
        </div>
      </AudioProvider>
    </StoreProvider>
  );
}

export default App;

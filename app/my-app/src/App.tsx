import { FabulaProvider } from './lib/FabulaContext';
import { Layout } from './components/Layout';

function App() {
  return (
    <FabulaProvider>
      <Layout />
    </FabulaProvider>
  );
}

export default App;

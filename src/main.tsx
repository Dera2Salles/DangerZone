import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { DangerProvider } from './useDangerProvider.tsx';

createRoot(document.getElementById('root')!).render(
  <DangerProvider>
    <App />
  </DangerProvider>,
);

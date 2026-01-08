import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@/context/ThemeContext';
import { CardStyleProvider } from '@/context/CardStyleContext';
import './index.css';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <CardStyleProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </CardStyleProvider>
    </ThemeProvider>
  </StrictMode>,
);

import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './global.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { UserProvider } from '@contexts/user-context.tsx';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <App />
      </UserProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

import { RouterProvider } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'sonner';
import { ViewLoggerInitializer } from './components/common/ViewLoggerInitializer/ViewLoggerInitializer';
import { queryClient } from './lib/queryClient';
import router from './routers/router';
import { StompProvider } from './stomp/StompProvider';

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <StompProvider>
        <Toaster richColors position="top-center" duration={3000} />
        <ViewLoggerInitializer />
        <RouterProvider router={router} />
      </StompProvider>
    </QueryClientProvider>
  );
};

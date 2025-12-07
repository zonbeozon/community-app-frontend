import { RouterProvider } from 'react-router-dom';
import { queryClient } from '@/lib/queryClient';
import { Router } from '@/router/Router';
import { StompProvider } from '@/stomp/StompProvider';
import { QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import { ViewLoggerInitializer } from '@/components/common/ViewLoggerInitializer/ViewLoggerInitializer';

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <StompProvider>
        <Toaster richColors position="top-center" duration={3000} />
        <ViewLoggerInitializer />
        <RouterProvider router={Router} />
      </StompProvider>
    </QueryClientProvider>
  );
};

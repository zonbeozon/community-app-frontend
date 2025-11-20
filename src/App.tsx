import { Toaster } from "sonner";
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from "./lib/queryClient";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { RouterProvider } from "react-router-dom";
import { StompProvider } from "./stomp/StompProvider";
import { ViewLoggerInitializer } from "./components/common/ViewLoggerInitializer/ViewLoggerInitializer";
import router from "./routers/router";

const App = () => {

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

export default App;
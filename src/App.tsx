import { Toaster } from "sonner";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from "react-router-dom";
import { StompProvider } from "./stomp/StompProvider";
import { ViewLoggerInitializer } from "./components/common/ViewLoggerInitializer/ViewLoggerInitializer";
import router from "./routers/router";


const queryClient = new QueryClient();

const App = () => {

  return (
    <QueryClientProvider client={queryClient}>
      <StompProvider>
          <Toaster richColors position="top-center" duration={3000} />
          <ViewLoggerInitializer />
          <RouterProvider router={router} />
      </StompProvider>
    </QueryClientProvider>
  );
};

export default App;
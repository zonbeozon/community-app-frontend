import { Toaster } from "sonner";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from "react-router-dom";
import { StompProvider } from "./stomp/StompProvider";
import { SseProvider } from "./sse/SseProvider";
import { ViewLoggerInitializer } from "./components/common/ViewLoggerInitializer/ViewLoggerInitializer";
import router from "./routers/router";


const queryClient = new QueryClient();

const App = () => {

  return (
    <QueryClientProvider client={queryClient}>
      <StompProvider>
        <SseProvider streamName="btcusdt@kline_1m">
          <Toaster richColors position="top-center" duration={3000} />
          <ViewLoggerInitializer />
          <RouterProvider router={router} />
        </SseProvider>
      </StompProvider>
    </QueryClientProvider>
  );
};

export default App;
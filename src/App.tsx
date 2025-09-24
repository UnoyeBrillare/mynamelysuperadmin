import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import { router } from "./lib/router";
import { Toaster } from "sonner";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <RouterProvider router={router} />
        <Toaster richColors theme="system" toastOptions={{}} />
      </div>
    </QueryClientProvider>
  );
}

export default App;

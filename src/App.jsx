import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Weather from "./components/Weather";

const queryClient = new QueryClient();

queryClient.setDefaultOptions({
  queries: {
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60,
    refetchOnWindowFocus: false,
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Weather />
    </QueryClientProvider>
  );
}

export default App;

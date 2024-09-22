import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Weather from "./pages/Weather";
import SignupForm from "./pages/SignupForm";
import LoginForm from "./pages/LoginForm";
import ProtectedRoute from "./pages/ProtectedRoute";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "./components/ui/toaster";
import Account from "./components/Account";

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
      <BrowserRouter>
        <Account />
        <Routes>
          <Route index element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/sign" element={<SignupForm />} />
          <Route
            path="/weather"
            element={
              <ProtectedRoute>
                <Weather />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<div>Not Found 404</div>} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;

import ReactDOM from "react-dom/client";
import "./index.css";
import router from "./router/router.jsx";
import { RouterProvider } from "react-router-dom";
import AuthProvider from "./context/AuthProvider.jsx";

//tankstack
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </AuthProvider>
);

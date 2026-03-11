import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Suspense } from "react";
import MainRoutes from "./routes";
import LoadingScreen from "./components/reusable-component/LoadingScreen";

function App() {
  const router = createBrowserRouter(MainRoutes);

  return (
    <>
      <ToastContainer stacked />
      <Suspense fallback={<LoadingScreen height="100vh" />}>
        <RouterProvider router={router} />
      </Suspense>
    </>
  );
}

export default App;

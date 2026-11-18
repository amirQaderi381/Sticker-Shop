import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./store/index.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFound from "./components/NotFound.jsx";
import MainLayout from "./components/layouts/MainLayout.jsx";
import { ToastContainer } from "react-toastify";
import ProductDetails from "./components/ProductDetails.jsx";
import "react-toastify/dist/ReactToastify.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
  },
  {
    path: `/products/:productID`,
    element: (
      <MainLayout>
        <ProductDetails />
      </MainLayout>
    ),
  },
  // {
  //   path : "cart",
  //   element : (<MainLayout><CartTable/></MainLayout>)
  // }
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      <ToastContainer />
    </Provider>
  </StrictMode>,
);

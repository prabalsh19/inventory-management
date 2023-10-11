import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Inventory } from "./pages/Inventory/Inventory.tsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import { Sales } from "./pages/Sales/Sales.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Inventory /> },
      { path: "sales", element: <Sales /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

import { StrictMode } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Home from "./pages/Home.jsx";
import Chats from "./pages/Chats.jsx";
import ContextProvider from "./context/AuthContext.jsx";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/chats",
        element: <Chats />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ContextProvider>
      <RouterProvider router={routes}>
        <App />
      </RouterProvider>
    </ContextProvider>
  </StrictMode>
);

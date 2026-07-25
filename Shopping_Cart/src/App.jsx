import { createBrowserRouter, RouterProvider } from "react-router";
import Layout from "./Layouts/Layout";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import NotFound from "./Pages/NotFound";
import "./App.css";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: "about", element: <About /> },
        { path: "contact", element: <Contact /> },
        { path: "*", element: <NotFound /> },
      ],
    },
  ],
  {
    basename: "/ShoppingCart",
  },
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

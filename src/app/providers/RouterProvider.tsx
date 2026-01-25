import Layout from "@/app/Layout";
import {
  createBrowserRouter,
  RouterProvider as ReactRouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <></>,
    children: [
      {
        path: "/:address",
        element: <>123</>,
      },
    ],
  },
]);

export default function RouterProvider() {
  return <ReactRouterProvider router={router} />;
}

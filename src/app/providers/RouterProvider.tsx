import Layout from "@/app/Layout/ui/Layout";
import DetailPage from "@/page/detailPage/ui";
import HomePage from "@/page/home";

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
        index: true,
        element: <HomePage />,
      },
      {
        path: "/:address",
        element: <DetailPage />,
      },
    ],
  },
]);

export default function RouterProvider() {
  return <ReactRouterProvider router={router} />;
}

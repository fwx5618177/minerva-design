import React, { lazy } from "react";
import { createHashRouter } from "react-router";
import Layout from "@layout/Layout";
import ErrorBoundary from "@pages/ErrorBoundary";
import NotFoundPage from "@pages/NotFoundPage";
import { routes } from "./routes";

const router = createHashRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        // The landing page is its own chunk, like every docs page
        index: true,
        Component: lazy(() => import("@pages/HomePage")),
      },
      ...routes,
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);

export default router;

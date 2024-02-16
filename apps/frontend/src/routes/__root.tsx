import { lazy, Suspense } from "react";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";

import "../app.css";
import { AuthContextProps } from "@/context/AuthProvider";
import { Toaster } from "@/components/ui/toaster";
import { NODE_ENV } from "@/config";

interface RouterContext {
  auth: AuthContextProps;
}

const TanStackRouterDevtools =
  NODE_ENV === "production"
    ? () => null
    : lazy(() =>
        import("@tanstack/router-devtools").then((res) => ({
          default: res.TanStackRouterDevtools,
        }))
      );

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <>
      <Outlet />
      <Toaster />
      <Suspense>
        <TanStackRouterDevtools />
      </Suspense>
    </>
  ),
});

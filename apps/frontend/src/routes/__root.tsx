import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { ToastContainer } from "react-toastify";

import "../app.css";
import "react-toastify/dist/ReactToastify.min.css";
import { AuthContextProps } from "@/context/AuthProvider";

interface RouterContext {
  auth: AuthContextProps;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <Outlet />
      <ToastContainer />
      <TanStackRouterDevtools />
    </>
  );
}

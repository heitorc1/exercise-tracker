import { createFileRoute, redirect } from "@tanstack/react-router";
import AppFrame from "@/components/shared/AppFrame";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const Route = createFileRoute("/dashboard")({
  component: Dashboard,
  beforeLoad: ({ context, location }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: "/",
        search: {
          redirect: location.href,
        },
      });
    }
  },
});

function Dashboard() {
  return (
    <AppFrame title="Dashboard">
      <div className="w-full flex gap-8 justify-between">
        <Card className="w-full p-2">
          <CardHeader>
            <CardTitle>Last week</CardTitle>
          </CardHeader>
          <CardContent>
            <div>Teste</div>
          </CardContent>
        </Card>

        <Card className="w-full">
          <CardHeader>
            <CardTitle>Last month</CardTitle>
          </CardHeader>
          <CardContent>
            <div>Teste</div>
          </CardContent>
        </Card>

        <Card className="w-full">
          <CardHeader>
            <CardTitle>Last six months</CardTitle>
          </CardHeader>
          <CardContent>
            <div>Teste</div>
          </CardContent>
        </Card>
      </div>
    </AppFrame>
  );
}

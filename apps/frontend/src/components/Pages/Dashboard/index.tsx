import AppFrame from "@/components/shared/AppFrame";
import Card from "@/components/shared/Card";
import CardGroup from "@/components/shared/CardGroup";

const Dashboard = () => {
  return (
    <AppFrame title="Dashboard">
      <CardGroup>
        <Card title="Last week">
          <div>Teste</div>
        </Card>

        <Card title="Last month">
          <div>Teste</div>
        </Card>

        <Card title="Last six months">
          <div>Teste</div>
        </Card>
      </CardGroup>
    </AppFrame>
  );
};

export default Dashboard;

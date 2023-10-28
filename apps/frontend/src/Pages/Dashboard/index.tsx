import AppFrame from "@/components/AppFrame";
import Card from "@/components/Card";
import CardGroup from "@/components/CardGroup";

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

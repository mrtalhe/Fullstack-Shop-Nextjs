import OrderTable from '../components/orderTable';
import { getOrders } from '../services';

const OrderDashboardView = async () => {
  const orders = await getOrders();
  return <OrderTable orders={orders} />;
};

export default OrderDashboardView;

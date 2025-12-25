
import UserTable from '../components/UsersTable';
import { GetUsers } from '../services';

const UsersDashboardView = async () => {

  const users = await GetUsers();

  return <UserTable users={users} />;
};

export default UsersDashboardView;

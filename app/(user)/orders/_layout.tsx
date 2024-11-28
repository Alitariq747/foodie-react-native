import { Stack } from 'expo-router';
import UserHeaderButton from '~/components/UserHeaderButton';

const UserOrdersLayout = () => {
  return <Stack screenOptions={{ headerRight: () => <UserHeaderButton /> }} />;
};

export default UserOrdersLayout;

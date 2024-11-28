import { Stack } from 'expo-router';

import UserHeaderButton from '~/components/UserHeaderButton';

const AdminOrdersLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerRight: () => <UserHeaderButton />,
      }}
    />
  );
};

export default AdminOrdersLayout;

import { Stack } from 'expo-router';

import UserHeaderButton from '~/components/UserHeaderButton';

const MenuLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerRight: () => <UserHeaderButton />,
      }}>
      <Stack.Screen name="index" options={{ headerTitle: 'Menu' }} />
    </Stack>
  );
};

export default MenuLayout;

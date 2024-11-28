import { Redirect } from 'expo-router';
import { ActivityIndicator } from 'react-native';

import { useAuth } from '~/Providers/AuthProvider';

const Home = () => {
  const { session, loading, isAdmin } = useAuth();

  if (loading) {
    return (
      <ActivityIndicator
        className="flex-1 items-center justify-center"
        size="large"
        color="#0000ff"
      />
    );
  }

  if (session && !isAdmin) {
    return <Redirect href="/(user)/orders" />;
  }

  if (isAdmin) {
    return <Redirect href="/(admin)/menu" />;
  }

  return <Redirect href="/(user)/menu" />;
};

export default Home;

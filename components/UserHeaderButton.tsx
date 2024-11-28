import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import { useRouter } from 'expo-router';
import { Pressable } from 'react-native';

import { useAuth } from '~/Providers/AuthProvider';

const UserHeaderButton = () => {
  const { session } = useAuth();
  const router = useRouter();
  return (
    <Pressable onPress={() => router.push('/modal')}>
      {session ? (
        <Entypo name="user" size={24} color="black" style={{ marginRight: 10 }} />
      ) : (
        <AntDesign name="user" size={24} color="black" style={{ marginRight: 10 }} />
      )}
    </Pressable>
  );
};

export default UserHeaderButton;

import { useState } from 'react';
import { View, Text, Pressable } from 'react-native';

import Login from './Login';
import SignUp from './Signup';

import { useAuth } from '~/Providers/AuthProvider';
import { supabase } from '~/utils/supabase';

const Auth = () => {
  const [signUp, setSignUp] = useState(false);

  const { profile, session } = useAuth();

  const signOutHandler = async () => {
    await supabase.auth.signOut();
  };

  if (session) {
    return (
      <View className="m-4 items-center justify-center gap-6 rounded-md border border-slate-500 bg-white px-2 py-4">
        <Text className="text-xl font-bold text-slate-900">Hello {profile?.full_name}!</Text>
        {/* <View className="flex-row items-center justify-center gap-6">
          <Link href={`/${segments[0]}/menu`}>
            <Text className="text-sm font-light text-slate-900">Visit Menu</Text>
          </Link>
          <Link href={`/${segments[0]}/orders`}>
            <Text className="text-sm font-light text-slate-900">Your Orders</Text>
          </Link>
        </View> */}

        {/* Sign Out Button */}
        <Pressable onPress={signOutHandler}>
          <View
            className="rounded-lg border border-slate-500 bg-slate-700 px-6 py-3"
            style={{ width: '35%' }}>
            <Text className="text-base font-semibold text-white">Sign out</Text>
          </View>
        </Pressable>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      {signUp ? <SignUp /> : <Login />}
      <View className="mx-4 flex-row items-center justify-between">
        <Text className="text-lg font-semibold text-slate-500">
          {signUp ? 'Already a user ?' : 'New to foodie?'}
        </Text>
        <Pressable onPress={() => setSignUp(!signUp)}>
          <Text className="cursor-pointer text-xl font-extrabold text-slate-800">
            {signUp ? 'Login' : 'Sign Up'}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Auth;

import { useRouter } from 'expo-router';
import { useState } from 'react';
import { View, Text, Alert, TextInput, Pressable } from 'react-native';

import { useAuth } from '~/Providers/AuthProvider';
import { supabase } from '~/utils/supabase';

const Login = () => {
  const router = useRouter();

  const [password, setPassword] = useState('');

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const { isAdmin } = useAuth();

  const handleSignIn = async () => {
    setLoading(true);
    const {
      data: { session, user },
      error,
    } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      Alert.alert(error.message);
      return;
    }

    if (user) {
      // Fetch the user's profile to determine role
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

      if (profileError || !profile) {
        Alert.alert('Failed to fetch user profile');
        setLoading(false);
        return;
      }

      // Redirect based on role
      if (profile.role === 'ADMIN') {
        router.replace('/(admin)/menu');
      } else {
        router.replace('/(user)/menu');
      }
    }

    setLoading(false);
    setEmail('');
    setPassword('');
  };

  return (
    <View className="gap-4 bg-white p-4">
      <View className="flex-col gap-2">
        <Text className="text-base font-bold text-slate-700">Enter Email</Text>
        <TextInput
          value={email}
          placeholder="e.g abc@email.com"
          onChangeText={setEmail}
          className="rounded-lg border border-slate-500 bg-white px-2 py-3 hover:border-red-900"
          autoCapitalize='none'
        />
      </View>
      <View className="flex-col gap-2">
        <Text className="text-base font-bold text-slate-700">Enter Password</Text>
        <TextInput
          value={password}
          placeholder="********"
          onChangeText={setPassword}
          className="rounded-lg border border-slate-500 bg-white px-2 py-3 hover:border-red-900"
          autoCapitalize='none'
          secureTextEntry
        />
      </View>
      <Pressable onPress={handleSignIn} disabled={loading}>
        <View
          className="rounded-lg border border-slate-500 bg-slate-700 px-6 py-3"
          style={{ width: '25%' }}>
          <Text className="text-base font-semibold text-white">Sign In</Text>
        </View>
      </Pressable>
    </View>
  );
};

export default Login;

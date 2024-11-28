import { useRouter } from 'expo-router';
import { useState } from 'react';
import { View, Text, TextInput, Pressable, Alert, ActivityIndicator } from 'react-native';

import { InsertProfile } from '~/types';
import { supabase } from '~/utils/supabase';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');
  const [fullname, setFullname] = useState('');
  const [address, setAddress] = useState('');
  const [contactNumber, setContactNumber] = useState('');

  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSignUp = async () => {
    setLoading(true);
    const {
      data: { session },
      error: signUpError,
    } = await supabase.auth.signUp({
      email,
      password,
    });
    if (signUpError) {
      Alert.alert(signUpError.message);
      console.log(signUpError);

      setLoading(false);
      return;
    }

    if (session) {
      const { error: profileError } = await supabase
        .from('profiles')
        .update({ username, full_name: fullname, address, phone: contactNumber })
        .eq('id', session.user.id);

      if (profileError) {
        Alert.alert(profileError.message);
        setLoading(false);
        return;
      }
    }
    setLoading(false);
    setEmail('');
    setPassword('');
    router.push('/(user)/menu');
  };

  return (
    <View className="gap-4 bg-white p-4">
      <View className="flex-col gap-2">
        <Text className="text-base font-bold text-slate-700">Enter Username</Text>
        <TextInput
          value={username}
          placeholder="e.g John"
          onChangeText={setUsername}
          className="rounded-lg border border-slate-500 bg-white px-2 py-3 hover:border-red-900"
        />
      </View>
      <View className="flex-col gap-2">
        <Text className="text-base font-bold text-slate-700">Enter Full Name</Text>
        <TextInput
          value={fullname}
          placeholder="e.g John Doe"
          onChangeText={setFullname}
          className="rounded-lg border border-slate-500 bg-white px-2 py-3 hover:border-red-900"
        />
      </View>
      <View className="flex-col gap-2">
        <Text className="text-base font-bold text-slate-700">Enter Address</Text>
        <TextInput
          value={address}
          placeholder="e.g XXX ZZ street Queensland"
          onChangeText={setAddress}
          className="rounded-lg border border-slate-500 bg-white px-2 py-3 hover:border-red-900"
        />
      </View>
      <View className="flex-col gap-2">
        <Text className="text-base font-bold text-slate-700">Enter Phone No</Text>
        <TextInput
          value={contactNumber}
          placeholder="e.g +923218722772"
          onChangeText={setContactNumber}
          className="rounded-lg border border-slate-500 bg-white px-2 py-3 hover:border-red-900"
        />
      </View>
      <View className="flex-col gap-2">
        <Text className="text-base font-bold text-slate-700">Enter Email</Text>
        <TextInput
          value={email}
          placeholder="e.g abc@email.com"
          onChangeText={setEmail}
          className="rounded-lg border border-slate-500 bg-white px-2 py-3 hover:border-red-900"
          autoCapitalize="none"
        />
      </View>
      <View className="flex-col gap-2">
        <Text className="text-base font-bold text-slate-700">Enter Password</Text>
        <TextInput
          value={password}
          placeholder="********"
          onChangeText={setPassword}
          className="rounded-lg border border-slate-500 bg-white px-2 py-3 hover:border-red-900"
          autoCapitalize="none"
          secureTextEntry
        />
      </View>
      <View className="flex-row gap-5">
        <Pressable onPress={handleSignUp} disabled={loading}>
          <View className="rounded-lg border border-slate-500 bg-slate-700 px-6 py-3">
            <Text className="text-base font-semibold text-white">Sign Up</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

export default SignUp;

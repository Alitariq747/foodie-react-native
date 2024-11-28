import { decode } from 'base64-arraybuffer';
import { randomUUID } from 'expo-crypto';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { View, Text, Button, Image, TextInput, Pressable } from 'react-native';
import { useInsertProduct } from '~/api/products';

import { supabase } from '~/utils/supabase';

const CreateProductScreen = () => {
  const [name, setName] = useState<string>('');
  const [image, setImage] = useState<string | null>('');
  const [price, setPrice] = useState<string>('');
  const [errors, setErrors] = useState<string>('');
  const [desc, setDesc] = useState<string>('');

  const router = useRouter();

  const { mutateAsync: insertProduct } = useInsertProduct();

  // function to pick image from device
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  // function to upload image to supabase
  const uploadImage = async () => {
    if (!image?.startsWith('file://')) {
      return;
    }

    const base64 = await FileSystem.readAsStringAsync(image, {
      encoding: 'base64',
    });
    const filePath = `${randomUUID()}.png`;
    const contentType = 'image/png';

    const { data, error } = await supabase.storage
      .from('product-images')
      .upload(filePath, decode(base64), { contentType });

    console.log(error);

    if (data) {
      // Generate the public URL
      const { data: publicUrlData } = supabase.storage
        .from('product-images')
        .getPublicUrl(filePath);

      if (publicUrlData) {
        return publicUrlData.publicUrl; // Return the public URL
      }
    }

    return null;
  };

  const resetFields = () => {
    setName('');
    setDesc('');
    setPrice('');
  };

  const validateInputs = () => {
    setErrors('');
    if (!name) {
      setErrors('Name is required');
      return false;
    }
    if (!price) {
      setErrors('Price is required');
      return false;
    }
    if (isNaN(parseFloat(price))) {
      setErrors('Price is not a number');
      return false;
    }
    return true;
  };

  // function to submit form to insert product into supabase
  const handleCreate = async () => {
    if (!validateInputs()) {
      return;
    }
    const imagePath = await uploadImage();

    insertProduct(
      { name, price: parseFloat(price), image: imagePath, description: desc },
      {
        onSuccess: () => {
          resetFields();
          router.back();
        },
      }
    );
  };

  return (
    <View className="gap-3 p-4">
      <View className="items-center">
        {!image ? (
          <Image
            source={require('../../assets/adaptive-icon.png')}
            style={{ width: 250, height: 250 }}
            className=""
          />
        ) : (
          <Image source={{ uri: image }} style={{ width: 250, height: 250 }} />
        )}
      </View>

      {/* Image */}
      <Button title="Pick an image" onPress={pickImage} />

      {/* Name, price, desc */}
      <View className="flex-col gap-2">
        <Text className="text-base font-bold text-slate-700">Enter Name</Text>
        <TextInput
          value={name}
          placeholder="Margarrita Pizza"
          onChangeText={setName}
          className="rounded-lg border border-slate-500 bg-white px-2 py-3 hover:border-red-900"
        />
      </View>

      <View className="flex-col gap-2">
        <Text className="text-base font-bold text-slate-700">Enter Price</Text>
        <TextInput
          value={price}
          placeholder="$9.99"
          onChangeText={setPrice}
          className="rounded-lg border border-slate-500 bg-white px-2 py-3 hover:border-red-900"
          keyboardType="numeric"
        />
      </View>
      <View className="flex-col gap-2">
        <Text className="text-base font-bold text-slate-700">Enter Description</Text>
        <TextInput
          value={desc}
          placeholder="..."
          onChangeText={setDesc}
          className="rounded-lg border border-slate-500 bg-white px-2 py-3 hover:border-red-900"
          multiline
        />
        <Text className="text-red-700">{errors}</Text>
        <Pressable onPress={handleCreate}>
          <View
            className="rounded-lg border border-slate-500 bg-slate-700 px-6 py-3"
            style={{ width: '25%' }}>
            <Text className="text-base font-semibold text-white">Create!</Text>
          </View>
        </Pressable>
      </View>

      {/* Button to add product */}
    </View>
  );
};

export default CreateProductScreen;

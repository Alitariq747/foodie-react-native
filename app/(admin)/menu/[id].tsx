import { Link, Stack, useLocalSearchParams, useRouter } from 'expo-router';
import {
  View,
  Text,
  Image,
  useWindowDimensions,
  Pressable,
  ActivityIndicator,
  Alert,
} from 'react-native';


import { useDeleteProduct, useProduct } from '~/api/products';

const ProductDetailScreen = () => {
  const { id } = useLocalSearchParams();

  const { width, height } = useWindowDimensions();

  const router = useRouter();

  const idAsNumber = +id;


  const { data: product, isLoading, isError, error } = useProduct(idAsNumber);

  const imageWidth = width - 0.1 * width;

  const { mutateAsync: deleteProduct } = useDeleteProduct(idAsNumber);


  const handleDelete = async () => {
    await deleteProduct()
    router.push('/(admin)/menu')
  };

  if (isLoading)
    return (
      <ActivityIndicator
        className="flex-1 items-center justify-center"
        size="large"
        color="#0000ff"
      />
    );
  if (isError) return <Text>Error: {error.message}</Text>;

  return (
    <>
      <Stack.Screen options={{ headerTitle: product?.name, headerBackTitle: 'Menu' }} />
      <View className="flex-1 flex-col justify-normal gap-2 bg-white p-4">
        {product?.image && (
          <Image
            className="rounded-xl"
            source={{ uri: product?.image }}
            style={{ width: imageWidth, height: '50%' }}
          />
        )}
        <Text className="text-2xl font-extrabold text-slate-800">{product?.name}</Text>
        <Text className="text-base font-normal text-slate-700">{product?.description}</Text>
        <Text className="text-lg font-bold text-slate-800">Only for: ${product?.price}</Text>
        <Pressable onPress={handleDelete}>
          <View
            className="mt-2 items-center rounded-lg border border-slate-500 bg-red-500 pb-2 pl-4 pr-4 pt-2"
            style={{ width: '40%' }}>
            <Text className="text-lg font-medium text-white">Delete from Menu</Text>
          </View>
        </Pressable>
      </View>
    </>
  );
};

export default ProductDetailScreen;

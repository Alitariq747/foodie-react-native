import { Stack, useLocalSearchParams } from 'expo-router';
import { View, Text, Image, useWindowDimensions, ActivityIndicator, Alert } from 'react-native';

import { useCart } from '~/Providers/CartProvider';
import { useProduct } from '~/api/products';
import CustomButton from '~/components/CustomButton';

const ProductDetailScreen = () => {
  const { id } = useLocalSearchParams();

  const { width } = useWindowDimensions();

  const idAsNumber = +id;

  const { addItem } = useCart();

  const { data: product, isLoading, isError, error } = useProduct(idAsNumber);

  const imageWidth = width - 0.1 * width;

  const handleAddToCart = () => {
    if (product) {
      addItem(product);
      Alert.alert('Success', `${product.name} has been added to your cart`);
    }
  };

  if (isLoading)
    return (
      <>
        <Stack.Screen options={{ headerTitle: '...', headerBackTitle: 'Menu' }} />
        <ActivityIndicator
          className="flex-1 items-center justify-center"
          size="large"
          color="#0000ff"
        />
      </>
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
        <CustomButton title="Add to cart" onPress={handleAddToCart} />
      </View>
    </>
  );
};

export default ProductDetailScreen;

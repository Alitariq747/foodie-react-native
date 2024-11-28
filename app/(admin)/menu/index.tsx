import { Stack } from 'expo-router';
import { View, FlatList,Text,  ActivityIndicator } from 'react-native';

import { useProducts } from '~/api/products';
import ProductListItem from '~/components/ProductListItem';

export default function Home() {
  const { data: products, isLoading, isError, error } = useProducts();

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
      <View>
        {products && (
          <FlatList
            numColumns={2}
            contentContainerStyle={{ gap: 10, padding: 10, marginTop: 10 }}
            columnWrapperStyle={{ gap: 10 }}
            data={products}
            renderItem={({ item }) => <ProductListItem product={item} />}
          />
        )}
      </View>
    </>
  );
}

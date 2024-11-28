import { View, Text, Image, useWindowDimensions } from 'react-native';
import { Link } from 'expo-router';
import { Product } from '~/types';

type ProductListItemProps = {
  product: Product
}

const ProductListItem = ({ product }: any) => {
  const { width, height } = useWindowDimensions();

  const imageWidth = (width - 0.15 * width) / 2;

  return (
    <Link href={`/menu/${product.id}`}>
      <View className="flex-col gap-2 rounded-lg border border-slate-400 bg-white p-2">
        <Image
          style={{ width: imageWidth }}
          className="h-48 object-fill"
          source={{ uri: product.image }}
        />
        <Text className="font-bold text-slate-500">{product.name}</Text>
        <Text className="font-medium text-slate-500">${product.price}</Text>
      </View>
    </Link>
  );
};

export default ProductListItem;

import { View, Text, Pressable } from 'react-native';

type CustomButtonProps = {
  title: string;
  onPress: () => void;
};

const CustomButton = ({ title, onPress }: CustomButtonProps) => {
  return (
    <Pressable onPress={onPress}>
      <View
        className="mt-2 items-center rounded-lg border border-slate-500 bg-red-500 pb-2 pl-4 pr-4 pt-2"
        style={{ width: '35%' }}>
        <Text className="text-lg font-medium text-white">{title}</Text>
      </View>
    </Pressable>
  );
};

export default CustomButton;

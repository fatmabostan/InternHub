import { router } from "expo-router";
import { View, Text, Image } from "react-native";
import { images } from "../../constants";
import CustomButton from "./CustomButton";

const EmptyState = ({ title, subtitle }) => {
  return (
    <View className="flex justify-center items-center px-8 bg-primary-background pb-20 border-t">
      <Image
        source={images.empty}
        resizeMode="contain"
        className="w-[270px] h-[216px] my-[-30]"
      />

      <Text className="text-sm font-pmedium text-black">{title}</Text>
      <Text className="text-xl text-center font-psemibold text-black">
        {subtitle}
      </Text>

      <CustomButton
        title="Keşfetmeye devam et!"
        handlePress={() => router.push("/home")}
        containerStyles="w-full my-10"
        bgColor="bg-primary-purple"
        textStyles="text-white"
      />
    </View>
  );
};

export default EmptyState;
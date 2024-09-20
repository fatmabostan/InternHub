import { View, Text, TouchableOpacity, Image } from "react-native";

const PopularJobCard = ({ item, handleCardPress }) => {
  return (
    <TouchableOpacity
      onPress={() => handleCardPress(item)}
    > 
    <View className="flex flex-col justify-center items-center text-center p-4 max-w-[240px] bg-primary-background rounded-lg border border-primary-purple">
        <Image
          source={{
            uri: `${item.companyLogoUrl}`,
          }}
          resizeMode='contain'
          style={{height:150, width:170}}
        />
      <Text className="text-lg font-pbold mt-2" numberOfLines={1}>
        {item.title}
      </Text>
        <Text className="text-ms font-bold" numberOfLines={1}>
          {item.companyName}
        </Text>
        <Text className="text-ms font-bold" numberOfLines={1}> 
          {item.country}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default PopularJobCard;
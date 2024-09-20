import { View, Text, TouchableOpacity, Image } from "react-native";

const BookmarkCard= ({ item, selectedJob, handleCardPress }) => {
  return (
    <TouchableOpacity className="my-2"
      onPress={() => handleCardPress(item)}
    > 
    <View className="flex flex-row justify-evenly items-center text-center py-3 mx-1 px-16 bg-primary-background rounded-lg border border-primary-purple">
        <Image
          source={{
            uri: `${item.companyLogoUrl}`,
          }}
          resizeMode='contain'
          style={{height:80, width:80}}
        />
        <View className="flex flex-col ml-8">
      <Text className="text-lg font-pbold mt-2" numberOfLines={1}>
        {item.title}
      </Text>
      <View className="flex flex-row space-x-4">
        <Text className="text-ms font-bold" numberOfLines={1}>
          {item.companyName}
        </Text>
        <Text className="text-ms font-bold" numberOfLines={1}> 
          {item.country}
        </Text>
        </View>
      </View>
      </View>
    </TouchableOpacity>
  );
};

export default BookmarkCard;
import { View, Text, TouchableOpacity, Image, Linking } from "react-native";

const Footer = ({ url }) => {
  return (
    <View>
      <TouchableOpacity className="bg-primary-purple py-3 mt-4 items-center rounded-full"
        onPress={() => Linking.openURL(url)}
      >
        <Text className="text-white font-pmedium text-base">İlana Başvur</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Footer;
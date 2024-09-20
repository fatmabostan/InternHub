import { View, Text } from "react-native";

const About = ({ info }) => {
  return (
    <View className="mt-3 mb-10">
      <Text className="font-pmedium text-base bg-primary-purple text-white">İş Hakkında:</Text>
      <View>
        <Text className="font-plight">{info}</Text>
      </View>
    </View>
  );
};

export default About;
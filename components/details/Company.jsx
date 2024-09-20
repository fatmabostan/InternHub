import React from "react";
import { View, Text, Image } from "react-native";

const Company = ({ jobTitle, companyName, location }) => {
  return (
    <View className="flex flex-col my-5">
      <View>
        <Text className="font-pmedium text-3xl underline">{jobTitle}</Text>
      </View>
      <View>
        <Text className="text-black font-bold text-lg">{companyName}</Text>
        <View>
          <View>
           <Text className="font-bold text-lg">{location}</Text> 
          </View>
        </View>
      </View>
    </View>
  );
};

export default Company;
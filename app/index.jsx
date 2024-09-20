import { StatusBar } from "expo-status-bar";
import { Redirect, router } from "expo-router";
import { View, Text, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "../constants";
import { CustomButton, Loader } from "../components";
import { useGlobalContext } from "../context/GlobalProvider";

const Welcome = () => {
  const { loading, isLogged } = useGlobalContext();

  if (!loading && isLogged) return <Redirect href="/home" />;

  return (
    
    <SafeAreaView className="h-full bg-primary-background">
      <Loader isLoading={loading} />

      <ScrollView
        contentContainerStyle={{
          height: "100%",
        }}
      >
        <View className="container w-full flex justify-center items-center h-full px-4">
          <View className="container flex flex-row justify-center mt-3"> 
          <Image
            source={images.logo}
            className="w-[130px] h-[80px]"
            resizeMode="contain"
          />
          <Text className="self-center -left-3 text-3xl font-psemibold bg-black text-white py-3 px-4">InternHub</Text>
          </View>
          <Image
            source={images.welcomepic}
            className="max-w-[380px] w-full h-[300px] mt-5"
            resizeMode="cover"
          />

          <View className="relative mt-4">
            <Text className="text-3xl text-black font-bold text-center">
              Senin için en uygun{"\n"}
              staj fırsatlarını{" "}
              <Text className="underline text-primary-green">keşfet!</Text>
            </Text>

          </View>

          <Text className="text-sm font-pregular text-black mt-4 text-center">
            InternHub, staj bulma ve stajyer arama platformudur. Sınırsız keşif imkanı sunarak geleceğinizi şekillendirmenize yardımcı oluyoruz. 
            İhtiyacınıza uygun staj fırsatlarını bulmak için hemen keşfe çıkın!
          </Text>

          <CustomButton
            title="Mail ile devam et"
            handlePress={() => router.push("/sign-in")}
            containerStyles="w-full mt-7"
            bgColor="bg-primary-purple"
            textStyles="text-white"
          />
        </View>
      </ScrollView>

      <StatusBar backgroundColor="#000000"/>
    </SafeAreaView>
  );
};

export default Welcome;

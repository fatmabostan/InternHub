import { useState } from "react";
import { router } from "expo-router";
import * as DocumentPicker from "expo-document-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  Alert,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import { icons } from "../../constants";
import { CustomButton, FormField } from "../../components";
import { useGlobalContext } from "../../context/GlobalProvider";

const Create = () => {
  const { user } = useGlobalContext();
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    companyName: "",
    applyLink: "",
    country: "",
    city: "",
    companyLogoUrl: null,
  });

  const openPicker = async (selectType) => {
    const result = await DocumentPicker.getDocumentAsync({
      type:
        selectType === "image"
          ? ["image/png", "image/jpg"]
          : null
    });

    if (!result.canceled) {
      if (selectType === "image") {
        setForm({
          ...form,
          companyLogoUrl: result.assets[0],
        });
      }

      if (selectType === null) {
        setForm({
          ...form,
          companyLogoUrl: null,
        });
      }
    } else {
      setTimeout(() => {
        Alert.alert("Document picked", JSON.stringify(result, null, 2));
      }, 100);
    }
  };

  const submit = async () => {
    if (
      (form.description === "") |
      (form.title === "") |
      !form.companyLogoUrl |
      (form.applyLink === "") |
      (form.companyName === "") |
      (form.country === "")
    ) {
      return Alert.alert("Şehir adı hariç tüm alanları doldurmak zorundasınız!");
    }

    setUploading(true);
    try {
      await createInternshipAdvert({
        ...form,
        userId: user.$id,
      });

      Alert.alert("Success", "Gönderi yüklendi!");
      router.push("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setForm({
        title: "",
        description: "",
        companyName: "",
        applyLink: "",
        companyLogoUrl: null,
      });

      setUploading(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary-background h-full">
      <ScrollView>  
      <Text className="px-4 py-4 font-psemibold text-2xl text-white bg-primary-purple">İlan Oluştur</Text>
      <View className="mx-4 mb-7">
        <FormField
          title="İlan Başlığı"
          value={form.title}
          placeholder="ilanı tanımlayacak bir başlık girin..."
          handleChangeText={(e) => setForm({ ...form, title: e })}
          otherStyles="mt-5"
        />

          <FormField
          title="Açıklama"
          value={form.description}
          placeholder="Pozisyon hakkında bilgilendirme..."
          handleChangeText={(e) => setForm({ ...form, description: e })}
          otherStyles="mt-7"
        />

        <FormField
          title="Firma Adı"
          value={form.companyName}
          placeholder="Firmanızın adını girin..."
          handleChangeText={(e) => setForm({ ...form, companyName: e })}
          otherStyles="mt-7"
        />

        <View className="mt-7 space-y-2">
          <Text className="text-base text-primary-purple font-pmedium">
            Firma Logosu
          </Text>

          <TouchableOpacity onPress={() => openPicker("image")}>
            {form.companyLogoUrl ? (
              <Image
                source={{ uri: form.companyLogoUrl.uri }}
                resizeMode="cover"
                className="w-full h-64 rounded-2xl"
              />
            ) : (
              <View className="w-full h-16 px-4 rounded-2xl border-2 border-primary-purple flex justify-center items-center flex-row space-x-2">
                <Image
                  source={icons.upload}
                  resizeMode="contain"
                  alt="upload"
                  className="w-5 h-5"
                />
                <Text className="text-sm text-primary-purple font-pmedium">
                  Görsel Seç
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <FormField
          title="Stajın Yapılacağı Ülke"
          value={form.country}
          placeholder="Ülke adı..."
          handleChangeText={(e) => setForm({ ...form, country: e })}
          otherStyles="mt-7"
        />

        <FormField
          title="Stajın Yapılacağı Şehir"
          value={form?.city}
          placeholder="Şehir girin..."
          handleChangeText={(e) => setForm({ ...form, city: e })}
          otherStyles="mt-7"
        />

        <CustomButton
          title="Kaydet ve Yayınla"
          handlePress={submit}
          containerStyles="mt-8"
          isLoading={uploading}
          bgColor="bg-primary-purple"
          textStyles="text-white"
        />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
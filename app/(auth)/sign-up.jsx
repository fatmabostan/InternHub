import { useState } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Dimensions, Alert} from "react-native";
import { createUser } from "../../lib/appwrite";
import { CustomButton, FormField } from "../../components";
import { useGlobalContext } from "../../context/GlobalProvider";

const SignUp = () => {
  const { setUser, setIsLogged } = useGlobalContext();

  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    isim: "",
    surname: "",
    username: "",
    email: "",
    password: "",
  });

  const submit = async () => {
    if (form.username === "" || form.email === "" || form.password === "" || form.name === "" || form.surname === "") {
      Alert.alert("Error", "Lütfen tüm alanları doldurun!");
    }
    setSubmitting(true);
    
    try {
      const result = await createUser(form.name, form.surname, form.username, form.email, form.password);
      setUser(result);
      setIsLogged(true);
      router.replace("/home");
    } 
    catch (error) {
      Alert.alert("Error", error.message);
    } 
    finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary-background h-full">
      <ScrollView>
        <View
          className="w-full flex justify-center h-full px-4 my-6"
          style={{
            minHeight: Dimensions.get("window").height - 100,
          }}
        >
          <Text className="text-2xl font-semibold text-primary-purple font-psemibold">
          Kayıt Ol
          </Text>
          <FormField
            title="İsim"
            value={form.name}
            handleChangeText={(e) => setForm({ ...form, name: e })}
            otherStyles="mt-8"
          />

          <FormField
            title="Soyad"
            value={form.surname}
            handleChangeText={(e) => setForm({ ...form, surname: e })}
            otherStyles="mt-8"
          />

          <FormField
            title="Kullanıcı Adı"
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e })}
            otherStyles="mt-8"
          />

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-8"
            keyboardType="email-address"
          />

          <FormField
            title="Şifre"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-8"
          />

          <CustomButton
            title="Kayıt Ol"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
            bgColor="bg-primary-purple"
            textStyles="text-white"
          />

          <View className="flex justify-center pt-5 items-center mb-24">
            <Link
              href="/sign-in"
              className="text-lg font-psemibold text-black underline"
            >
              Zaten hesabınız var mı?
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
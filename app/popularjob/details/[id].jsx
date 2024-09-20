import { useRouter, useLocalSearchParams } from "expo-router";
import { useCallback, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
  Alert
} from "react-native";
import useAppwrite from "../../../lib/useAppwrite";
import { default as JobAbout } from "../../../components/details/About";
import { default as JobFooter } from "../../../components/details/Footer";
import Company from "../../../components/details/Company";
import { getAllPosts, savePost } from "../../../lib/appwrite";
const PopularDetails = () => {
  const params = useLocalSearchParams();
  const router = useRouter();
  const postId = params.id;
  const { data, loading, refetch } = useAppwrite(getAllPosts);
  const post = data?.find((item) => item.$id === params.id);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch()
    setRefreshing(false)
  }, []);

  const handleSavePost = async (postId) => {
    try {
      const savedPost = await savePost(postId);
      Alert.alert('Success', 'İlan başarıyla kaydedildi!');
    } catch (error) {
      Alert.alert('Error', 'İlan kaydedilirken sorunla karşılaşıldı.');
      console.error('Error saving post:', error);
    }
  };

  return (
    <SafeAreaView className="bg-primary-background" style={{ flex: 1}}>       
        <ScrollView  showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        ><Text className="mt-7 px-4 py-5 font-psemibold text-2xl text-white bg-primary-purple">İlan Detayı</Text>
          {loading ? (
            <ActivityIndicator size='large' />
          ) : post?.length === 0 ? (
            <Text>Burada gösterilecek bir ilan yok.</Text>
          ) : (
            <View className="mx-4 mb-7">
              <Company
                companyLogo={post.companyLogoUrl}
                jobTitle={post.title}
                companyName={post.companyName}
                location={post.country}
              />
              <JobAbout info={post.description ?? "Bir sorunla karşılaşıldı."} />
              <TouchableOpacity
              onPress={() => handleSavePost(postId)}
            >
              <Text className="bg-primary-green text-white py-3 rounded-full text-center text-lg font-bold">İlanı Kaydet</Text>
            </TouchableOpacity>
            <JobFooter url={post?.applyLink ?? 'https://careers.google.com/jobs/results/'} />
            </View>
          )}
        </ScrollView>
    </SafeAreaView>
  )
};

export default PopularDetails;
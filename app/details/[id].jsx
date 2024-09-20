import { Stack, useLocalSearchParams } from "expo-router";
import { useCallback, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { default as JobAbout } from "../../components/details/About";
import { default as JobFooter } from "../../components/details/Footer";
import Company from "../../components/details/Company";
import JSearchApi from "../../lib/JSearchApi"

const JobDetails = () => {
  const params = useLocalSearchParams();

  const { data, isLoading, error, refetch } = JSearchApi("job-details", {
    job_id: params.id,
  });

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch()
    setRefreshing(false)
  }, []);



  return (
    <SafeAreaView className="bg-primary-background" style={{ flex: 1 }}>
      <Stack.Screen
      />
        <ScrollView showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        ><Text className="mt-5 px-4 pb-4 pt-5  font-psemibold text-2xl text-white bg-primary-purple">İlan Detayı</Text>
          {isLoading ? (
            <ActivityIndicator size='large' />
          ) : error ? (
            <Text>Something went wrong</Text>
          ) : data.length === 0 ? (
            <Text>Burada gösterilecek bir ilan yok.</Text>
          ) : (
            <View className="mx-4 mb-7">
              <Company
                companyLogo={data[0].employer_logo}
                jobTitle={data[0].job_title}
                companyName={data[0].employer_name}
                location={data[0].job_country}
              />

              <JobAbout info={data[0].job_description ?? "No data provided"} />
              <Text className="bg-primary-green text-white py-3 rounded-full text-center text-lg font-bold">İlanı Kaydet</Text>
            <JobFooter url={data[0]?.job_google_link ?? 'https://careers.google.com/jobs/results/'} />
            </View>
          )}

        </ScrollView>
    </SafeAreaView>
  );
};

export default JobDetails;
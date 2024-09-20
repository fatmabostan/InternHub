import React from "react";
import { useRouter } from "expo-router";
import { View, Text, ActivityIndicator } from "react-native";
import JSearchApi from "../lib/JSearchApi"
import JobInfoCard from "../components/cards/JobInfoCard";

const JobInfo = () => {
  const router = useRouter();
  const { data, isLoading, error } = JSearchApi("search", {
    query: "React Native developer",
    num_pages: "1",
  });

  return (
    <View className="bg-primary-background border-t">
      <View className="flex flex-col mt-4">
      <View>
        <Text className="text-lg font-pregular text-primary-purple mx-4">Diğer İlanlar</Text>
      </View>

      <View className="mb-8">
        {isLoading ? (
          <ActivityIndicator size='large' />
        ) : error ? (
          <Text className="text-lg font-pregular text-primary-purple text-center">Bir şeyler ters gitti.</Text>
        ) : (
          data?.map((job) => (
            <JobInfoCard
              job={job}
              key={`nearby-job-${job.job_id}`}
              handleNavigate={() => router.push(`/details/${job.job_id}`)}
            />
          ))
        )}
      </View>
    </View>
    </View>
  );
};

export default JobInfo;
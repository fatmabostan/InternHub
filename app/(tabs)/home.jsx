import { useState } from "react";
import { FlatList, RefreshControl, Text, View, ScrollView } from "react-native";
import { getAccount, getAllPosts, getLatestPosts } from "../../lib/appwrite";
import { EmptyState, SearchInput, PopularJobs, JobInfo } from "../../components";
import useAppwrite from "../../lib/useAppwrite";


const Home = () => {
  const { data: posts, refetch } = useAppwrite(getAllPosts);
  const { data: latestPosts } = useAppwrite(getLatestPosts);
  const { data: user } = useAppwrite(getAccount);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };


  return (
    <ScrollView className="bg-primary-background mt-5">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        ListHeaderComponent={() => (
          <View className="flex mt-10 space-y-1 flex-col">
            <View className="flex justify-between items-start mb-2 mx-4">
                <Text className="text-xl text-primary-purple">
                  Hoşgeldin,
                </Text>
                <Text className="text-3xl font-psemibold text-primary-purple">
                  {user.name}!
                </Text>
              </View>
              <View className="mx-4 mb-7">
            <SearchInput />
            </View>
            <View className="w-full flex-1 pt-2 pb-7 border-t">
              <Text className="text-lg font-pregular text-primary-purple mx-4">
                    Popüler İlanlar
              </Text>
              <PopularJobs posts={latestPosts ?? []} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="Hiç staj ilanı bulunamadı."
            subtitle="Henüz staj ilanı oluşturulmadı."
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
      <JobInfo />
    </ScrollView>
  );
};

export default Home;
import React, {  useState } from 'react';
import { View, Text, FlatList, RefreshControl, ActivityIndicator} from 'react-native';
import { getSavedPosts } from '../../lib/appwrite';
import { useRouter } from 'expo-router';
import useAppwrite from '../../lib/useAppwrite';
import BookmarkCard from '../../components/cards/BookmarkCard';

const Bookmark = () => {
  const { data: savedPosts, isLoading } = useAppwrite(getSavedPosts);
  const router = useRouter();
  const [selectedJob, setSelectedJob] = useState();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

   const handleCardPress = (item) => {
     router.push(`/popularjob/details/${item.$id}`);
     setSelectedJob(item.$id);
   };
 
  return (
    <View className="bg-primary-background h-full mt-0">
      <Text className="mt-6 px-4 py-5 font-psemibold text-2xl text-white bg-primary-purple">Kaydedilen İlanlar</Text>
      <View className=" flex flex-col my-5 space-y-4">
      <View className="items-center">
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={savedPosts}
          renderItem={({ item }) => (
            <BookmarkCard
              item={item}
              selectedJob={selectedJob}
              handleCardPress={handleCardPress}
            />
          )}
          keyExtractor={(item) => item.$id}
          contentContainerStyle={{ columnGap: 20 }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />  
      )}
      </View>
      </View>    
    </View>
  );
};

export default Bookmark;

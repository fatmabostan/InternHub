import React from 'react';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { View, FlatList } from 'react-native';
import PopularJobCard  from './cards/PopularJobCard';

const PopularJobs = ({posts}) => {
  const router = useRouter();
 const [selectedJob, setSelectedJob] = useState();

  const handleCardPress = (item) => {
    router.push(`/popularjob/details/${item.$id}`);
    setSelectedJob(item.$id);
  };

  return (
    <View className="flex mt-1">
      <View>
          <FlatList
            data={posts}
            renderItem={({ item }) => (
              <PopularJobCard
                item={item}
                selectedJob={selectedJob}
                handleCardPress={handleCardPress}
              />
            )}
            keyExtractor={(item) => item.$id}
            contentContainerStyle={{ columnGap: 20 }}
            horizontal
          />
      </View>
    </View>
  );
};

export default PopularJobs;


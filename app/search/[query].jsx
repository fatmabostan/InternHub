import { useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import { View, Text, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import JSearchApi from "../../lib/JSearchApi";
import { EmptyState, SearchInput } from "../../components";
import JobInfoCard from "@/components/cards/JobInfoCard";

const Search = () => {
  const { query } = useLocalSearchParams();
  const { data: posts, refetch } = JSearchApi(query);

  useEffect(() => {
    refetch();
  }, [query]);

  return (
    <SafeAreaView className="bg-primary-background h-full px-2">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <JobInfoCard
           job={item}
          />
        )}
        ListHeaderComponent={() => (
          <>
            <View className="flex mt-8 px-4">
              <Text className="font-pmedium text-black text-lg">
                Arama Sonuçları
              </Text>
              <Text className="text-2xl font-psemibold text-primary-purple mt-1">
                {query}
              </Text>

              <View className="mt-6 mb-5">
                <SearchInput initialQuery={query} refetch={refetch} />
              </View>
            </View>
          </>
        )}
        ListEmptyComponent={() => (
          <EmptyState
          title="İçerik bulunamadı"
          subtitle="Burada gösterilecek bir şey yok."
        />
        )}
      />
    </SafeAreaView>
  );
};

export default Search;
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { fetchTVShowsByCategory } from "@/services/api";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons } from "@/constants/icons";
import PosterCard from "@/components/PosterCard";

export default function SeeAllTVShow() {
  const { category, title } = useLocalSearchParams();
  const [tvs, setTvs] = useState<TVShow[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);

  const loadTVs = async (pageNum: number) => {
    try {
      const results = await fetchTVShowsByCategory(category as string, pageNum);
      setTvs((prev) => (pageNum === 1 ? results : [...prev, ...results]));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    loadTVs(1);
  }, [category]);

  const handleLoadMore = () => {
    if (!loadingMore) {
      setLoadingMore(true);
      const nextPage = page + 1;
      setPage(nextPage);
      loadTVs(nextPage);
    }
  };

  return (
    <SafeAreaView className="bg-primary flex-1">
      {/* Header */}
      <View className="flex-row items-center px-5 py-4 gap-x-3">
        <TouchableOpacity onPress={router.back}>
          <Image
            source={icons.arrow}
            className="size-5 rotate-180"
            tintColor="#fff"
          />
        </TouchableOpacity>
        <Text className="text-white font-bold text-xl">{title}</Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#fff" className="mt-10" />
      ) : (
        <FlatList
          data={tvs}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <PosterCard {...item} type="tv"/>}
          numColumns={3}
          columnWrapperStyle={{
            justifyContent: "center",
            gap: 20,
            paddingRight: 5,
            marginBottom: 10,
          }}
          contentContainerStyle={{ padding: 20 }}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            loadingMore ? (
              <ActivityIndicator size="large" color="#fff" className="my-4" />
            ) : null
          }
        />
      )}
    </SafeAreaView>
  );
}

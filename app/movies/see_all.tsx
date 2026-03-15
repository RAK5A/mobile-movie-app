import PosterCard from "@/components/PosterCard";
import { icons } from "@/constants/icons";
import { fetchMoviesByCategory } from "@/services/api";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SeeAllMovies() {
  const { category, title } = useLocalSearchParams();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);

  const loadMovies = async (pageNum: number) => {
    try {
      const results = await fetchMoviesByCategory(category as string, pageNum);
      setMovies((prev) => (pageNum === 1 ? results : [...prev, ...results]));
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    loadMovies(1);
  }, [category]);

  const handleLoadMore = () => {
    if (!loadingMore) {
      setLoadingMore(true);
      const nextPage = page + 1;
      setPage(nextPage);
      loadMovies(nextPage);
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
          data={movies}
          renderItem={({ item }) => <PosterCard {...item} />}
          keyExtractor={(item) => item.id.toString()}
          numColumns={3}
          columnWrapperStyle={{
            justifyContent: "flex-start",
            gap: 20,
            paddingRight: 5,
            marginBottom: 10,
          }}
          contentContainerStyle={{ padding: 20 }}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            loadingMore ? (
              <ActivityIndicator size="small" color="#fff" className="my-4" />
            ) : null
          }
        />
      )}
    </SafeAreaView>
  );
}

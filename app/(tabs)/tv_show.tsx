import { icons } from "@/constants/icons";
import React from "react";
import { Image, View, ScrollView } from "react-native";
import MovieSection from "@/components/MovieSection";
import useFetch from "@/services/usefetch";
import {
  fetchTrendingTVShows,
  fetchPopularTVShows,
  fetchTopRatedTVShows,
} from "@/services/api";

export default function TVShow() {
  const {
    data: trending,
    loading: trendingLoading,
    error: trendingError,
  } = useFetch(() => fetchTrendingTVShows());

  const {
    data: popular,
    loading: popularLoading,
    error: popularError,
  } = useFetch(() => fetchPopularTVShows());

  const {
    data: topRated,
    loading: topRatedLoading,
    error: topRatedError,
  } = useFetch(() => fetchTopRatedTVShows());

  return (
    <View className="flex-1 bg-primary">
      <Image
        source={icons.logo}
        className="w-12 h-10 mt-20 mb-5 mx-auto"
      />
      <ScrollView className="px-5" contentContainerStyle={{ paddingBottom: 80 }}>
        <MovieSection
          title="Trending TV Shows"
          data={trending}
          loading={trendingLoading}
          error={trendingError}
          category="trending_tv"
        />

        <MovieSection
          title="Popular TV Shows"
          data={popular}
          loading={popularLoading}
          error={popularError}
          category="popular_tv"
        />

        <MovieSection
          title="Top Rated TV"
          data={topRated}
          loading={topRatedLoading}
          error={topRatedError}
          category="top_rated_tv"
        />
      </ScrollView>
    </View>
  );
}

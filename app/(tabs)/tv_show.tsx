import SearchBar from "@/components/SearchBar";
import TVShowSection from "@/components/TVShowSection";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import {
  fetchOnTheAirTVShows,
  fetchTopRatedTVShows,
  fetchTrendingTVShows,
  fetchTVShow,
} from "@/services/api";
import useFetch from "@/services/usefetch";
import { useRouter } from "expo-router";
import { useState } from "react";
import { FlatList, Image, View } from "react-native";

export default function Index() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const {
    data: tvShows,
    loading: tvShowsLoading,
    error: tvShowsError,
  } = useFetch(() => fetchTVShow({query: ''}));

  const {
    data: trendingTvShows,
    loading: trendingLoading,
    error: trendingError,
  } = useFetch(() => fetchTrendingTVShows());

  const {
    data: onTheAirTv,
    loading: onTheAirTvLoading,
    error: onTheAirTvError,
  } = useFetch(() => fetchOnTheAirTVShows());

  const {
    data: topratedTv,
    loading: topratedTvLoading,
    error: topratedTvError,
  } = useFetch(() => fetchTopRatedTVShows());

  return (
    <View className="flex-1 bg-primary">
      <Image
        source={images.bg}
        className="absolute w-full z-0"
        resizeMode="cover"
      />

      <FlatList
        data={[]}
        renderItem={null}
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 100 }}
        ListHeaderComponent={
          <>
            <View className="w-full flex-row justify-center mt-20 mb-10">
              <Image source={icons.logo} className="w-12 h-10" />
            </View>
            <SearchBar
              onPress={() => router.push("/search")}
              placeholder="Search for a tv show"
              value={searchQuery}
              onChangeText={(text) => setSearchQuery(text)}
            />

            <TVShowSection
              title="Trending TV Shows"
              data={trendingTvShows}
              loading={trendingLoading}
              error={trendingError}
              category="trending"
            />

            <TVShowSection
              title="On The Air Tv Shows"
              data={onTheAirTv}
              loading={onTheAirTvLoading}
              error={onTheAirTvError}
              category="on_the_air"
            />

            <TVShowSection
              title="Discover TV Shows"
              data={tvShows}
              loading={tvShowsLoading}
              error={tvShowsError}
              category="discover"
            />

            <TVShowSection
              title="Top Rated TV Shows"
              data={topratedTv}
              loading={topratedTvLoading}
              error={topratedTvError}
              category="top_rated"
            />
          </>
        }
      />
    </View>
  );
}

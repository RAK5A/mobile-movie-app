import MovieSection from "@/components/MovieSection";
import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import {
  fetchMovies,
  fetchTopRatedMovies,
  fetchTrendingMovies,
  fetchUpComingMovies,
} from "@/services/api";
import useFetch from "@/services/usefetch";
import { useRouter } from "expo-router";
import { useState } from "react";
import { FlatList, Image, View } from "react-native";

export default function Index() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
  } = useFetch(() => fetchMovies({ query: "" }));

  const {
    data: trendingMovies,
    loading: trendingLoading,
    error: trendingError,
  } = useFetch(() => fetchTrendingMovies());

  const {
    data: upcomingMovies,
    loading: upcomingLoading,
    error: upcomingError,
  } = useFetch(() => fetchUpComingMovies());

  const {
    data: topratedMovie,
    loading: topratedLoading,
    error: topratedError,
  } = useFetch(() => fetchTopRatedMovies());

  return (
    <View className="flex-1 bg-primary">
      <Image
        source={images.bg}
        className="absolute w-full z-0"
        resizeMode="cover"
      />

      <FlatList
        /* data={movies}
        renderItem={({ item }) => <MovieCard {...item} />}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "flex-start",
          gap: 20,
          paddingRight: 5,
          marginBottom: 10,
        }} */
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
              placeholder="Search for a movie"
              value={searchQuery}
              onChangeText={(text) => setSearchQuery(text)}
            />

            {/* Trending Section */}
            <MovieSection
              title="Trending Movies"
              data={trendingMovies}
              loading={trendingLoading}
              error={trendingError}
              category="trending"
            />
            {/* Up Coming Section */}
            <MovieSection
              title="Upcoming Movies"
              data={upcomingMovies}
              loading={upcomingLoading}
              error={upcomingError}
              category="upcoming"
            />
            {/* Latest Section */}
            <MovieSection
              title="Discover Movies"
              data={movies}
              loading={moviesLoading}
              error={moviesError}
              category="discover"
            />
            {/* Top Rated Section */}
            <MovieSection
              title="Top Rated Movie"
              data={topratedMovie}
              loading={topratedLoading}
              error={topratedError}
              category="top_rated"
            />

            {/* Latest Section */}
            {/* <Text className="text-lg text-white font-bold mt-5 mb-3">
              Latest Movies
            </Text>
            {moviesLoading && (
              <ActivityIndicator size="large" color="#fff" className="my-3" />
            )}
            {moviesError && (
              <Text className="text-red-500">Failed to load latest movies</Text>
            )} */}
          </>
        }
        // ListEmptyComponent={
        //   !moviesLoading && !moviesError ? (
        //     <Text className="text-center text-gray-400 mt-5">
        //       No movies found
        //     </Text>
        //   ) : null
        // }
      />
    </View>
  );
}

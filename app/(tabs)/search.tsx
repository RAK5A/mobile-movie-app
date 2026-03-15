import ExpandableSection from "@/components/ExpandableSection";
import PosterCard from "@/components/PosterCard";
import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies, fetchTVShow } from "@/services/api";
import useFetch from "@/services/usefetch";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Search() {
  const [searchQuery, setSearchQuery] = useState("");

  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
    refetch: loadMovies,
    reset: resetMovies,
  } = useFetch(() => fetchMovies({ query: searchQuery }), false);

  const {
    data: tvShows,
    loading: tvLoading,
    error: tvError,
    refetch: loadTVShows,
    reset: resetTVShows,
  } = useFetch(() => fetchTVShow({ query: searchQuery }), false);

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (searchQuery.trim()) {
        await loadMovies();
        await loadTVShows();
      } else {
        resetMovies();
        resetTVShows();
      }
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const hasResults = (movies?.length ?? 0) > 0 || (tvShows?.length ?? 0) > 0;

  return (
    <View className="flex-1 bg-primary">
      <Image
        source={images.bg}
        className="absolute z-0 w-full"
        resizeMode="cover"
      />

      <FlatList
        data={[]}
        renderItem={null}
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListHeaderComponent={
          <>
            {/* Logo */}
            <View className="w-full flex-row justify-center mt-20 items-center">
              <Image source={icons.logo} className="w-12 h-10" />
            </View>

            {/* Search Bar */}
            <View className="my-5 flex-row items-center gap-x-2">
              <View className="flex-1">
                <SearchBar
                  placeholder="Search movies & TV shows..."
                  value={searchQuery}
                  onChangeText={(text: string) => setSearchQuery(text)}
                />
              </View>

              {/* Clear search */}
              {searchQuery.trim() ? (
                <TouchableOpacity
                  onPress={() => setSearchQuery("")}
                  className="bg-dark-100 rounded-full w-9 h-9 items-center justify-center"
                >
                  <Text className="text-white font-bold">✕</Text>
                </TouchableOpacity>
              ) : null}
            </View>

            {/* Search label */}
            {searchQuery.trim() && hasResults && (
              <Text className="text-xl text-white font-bold">
                Results for{" "}
                <Text className="text-purple-400">{searchQuery}</Text>
              </Text>
            )}

            {/* Empty state */}
            {searchQuery.trim() &&
              !moviesLoading &&
              !tvLoading &&
              !hasResults && (
                <Text className="text-center text-gray-500 mt-10">
                  No results found for {searchQuery}
                </Text>
              )}

            {/* No search yet */}
            {!searchQuery.trim() && (
              <Text className="text-center text-gray-500 mt-10">
                Type something to search
              </Text>
            )}

            {/* Movies Section */}
            {(moviesLoading || (movies?.length ?? 0) > 0) && (
              <ExpandableSection
                title="Movies"
                loading={moviesLoading}
                error={moviesError}
                count={movies?.length ?? 0}
              >
                <View className="flex-row flex-wrap gap-4">
                  {movies?.map((item) => (
                    <PosterCard key={item.id} {...item} type="movie" />
                  ))}
                </View>
              </ExpandableSection>
            )}

            {/* TV Shows Section */}
            {(tvLoading || (tvShows?.length ?? 0) > 0) && (
              <ExpandableSection
                title="TV Shows"
                loading={tvLoading}
                error={tvError}
                count={tvShows?.length ?? 0}
              >
                <View className="flex-row flex-wrap gap-4">
                  {tvShows?.map((item) => (
                    <PosterCard key={item.id} {...item} type="tv" />
                  ))}
                </View>
              </ExpandableSection>
            )}
          </>
        }
      />
    </View>
  );
}

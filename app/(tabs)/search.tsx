import React, { useState } from "react";
import { Image, View, TextInput, FlatList, ActivityIndicator, Text } from "react-native";
import { images } from "@/constants/images";
import MovieCard from "@/components/MovieCard";
import { fetchMovies, fetchTVShows } from "@/services/api";
import useFetch from "@/services/usefetch";

export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const performSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const [movies, tv] = await Promise.all([
        fetchMovies({ query }),
        fetchTVShows({ query }),
      ]);
      // mark tv results so cards point to tv detail
      const tvWithType = tv.map((item) => ({ ...item, mediaType: "tv" } as Movie & { mediaType: "tv" }));
      setResults([...movies, ...tvWithType]);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Unknown"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-primary px-5">
      <Image
        source={images.bg}
        className="absolute z-0 w-full"
        resizeMode="contain"
      />
      <TextInput
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={performSearch}
        placeholder="Search movies or TV shows"
        placeholderTextColor="#888"
        className="bg-white/20 text-white rounded-lg px-4 py-2 mt-20"
      />
      {loading && <ActivityIndicator size="large" color="#fff" className="mt-4" />}
      {error && <Text className="text-red-400 mt-2">{error.message}</Text>}
      <FlatList
        data={results}
        keyExtractor={(item) => item.id.toString() + (item.mediaType || "")}
        renderItem={({ item }) => (
          <MovieCard {...item} mediaType={(item as any).mediaType || "movie"} containerClassName="w-full mb-4" />
        )}
        contentContainerStyle={{ paddingTop: 10, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

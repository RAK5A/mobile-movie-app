import React, { useState } from "react";
import { TextInput, FlatList, ActivityIndicator, Text, View, Pressable, Keyboard, Image } from "react-native";
import { fetchPopularPeople, searchPeople } from "@/services/api";
import useFetch from "@/services/usefetch";
import PersonCard from "@/components/PersonCard";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { images } from "@/constants/images";

export default function People() {
  const {
    data: popular,
    loading: popularLoading,
    error: popularError,
  } = useFetch(() => fetchPopularPeople());

  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Person[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) {
      setResults([]);
      setHasSearched(false);
      return;
    }
    setSearchLoading(true);
    setHasSearched(true);
    try {
      const r = await searchPeople(query);
      setResults(r);
    } catch (e) {
      console.error(e);
    } finally {
      setSearchLoading(false);
    }
  };

  const clearSearch = () => {
    setQuery("");
    setResults([]);
    setHasSearched(false);
    Keyboard.dismiss();
  };

  const displayList = hasSearched ? results : popular || [];
  const isLoading = searchLoading || popularLoading;
  const error = popularError;

  return (
    <View className="flex-1 bg-primary">
      <Image
        source={images.bg}
        className="absolute inset-0 z-0"
        resizeMode="cover"
      />

      <SafeAreaView className="flex-1">
        <View className="px-5 pt-4 pb-2">
          <Text className="text-3xl font-bold text-white mb-6">Discover People</Text>

          <View className="relative">
            <View className="flex-row items-center bg-dark-100/80 border border-white/10 rounded-2xl px-4 py-3 h-14">
              <Ionicons name="search" size={20} color="#A8B5DB" />
              <TextInput
                value={query}
                onChangeText={setQuery}
                onSubmitEditing={handleSearch}
                placeholder="Search for actors, directors..."
                placeholderTextColor="#A8B5DB"
                className="flex-1 text-white ml-3 text-base"
                returnKeyType="search"
              />
              {query.length > 0 && (
                <Pressable onPress={clearSearch}>
                  <Ionicons name="close-circle" size={20} color="#A8B5DB" />
                </Pressable>
              )}
            </View>
          </View>

          {hasSearched && !searchLoading && (
            <View className="mt-4 flex-row justify-between items-center">
              <Text className="text-light-200 text-sm">
                Search results for "{query}"
              </Text>
              <Pressable onPress={clearSearch}>
                <Text className="text-accent text-sm font-semibold">Clear</Text>
              </Pressable>
            </View>
          )}
        </View>

        <View className="flex-1 mt-2">
          {isLoading && !hasSearched ? (
            <View className="flex-1 justify-center items-center">
              <ActivityIndicator size="large" color="#AB8BFF" />
            </View>
          ) : error ? (
            <View className="flex-1 justify-center items-center px-10">
              <Text className="text-red-400 text-center">{error.message}</Text>
            </View>
          ) : (
            <FlatList
              data={displayList}
              keyExtractor={(item) => item.id.toString()}
              numColumns={3}
              renderItem={({ item }) => (
                <PersonCard
                  id={item.id}
                  name={item.name}
                  profile_path={item.profile_path}
                  known_for_department={item.known_for_department}
                  containerClassName="p-1.5"
                />
              )}
              contentContainerStyle={{ paddingHorizontal: 10, paddingBottom: 120 }}
              columnWrapperStyle={{ justifyContent: "flex-start" }}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={() => (
                hasSearched && !searchLoading ? (
                  <View className="mt-20 justify-center items-center">
                    <Text className="text-light-200 text-lg">No people found</Text>
                  </View>
                ) : null
              )}
            />
          )}
        </View>
      </SafeAreaView>
    </View>
  );
}

import { fetchPopularPeople, searchPeople } from "@/services/api";
import useFetch from "@/services/usefetch";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - 48) / 3;
const IMAGE_BASE = "https://image.tmdb.org/t/p/w342";

export default function Profile() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Person[]>([]);
  const [searching, setSearching] = useState(false);

  const {
    data: people,
    loading,
    error,
    refetch,
  } = useFetch<Person[]>(() => fetchPopularPeople(1));

  // Handle search input
  const handleSearch = async (text: string) => {
    setQuery(text);
    if (text.trim().length === 0) {
      setSearchResults([]);
      setSearching(false);
      return;
    }
    setSearching(true);
    try {
      const results = await searchPeople(text);
      setSearchResults(results);
    } catch {
      setSearchResults([]);
    } finally {
      setSearching(false);
    }
  };

  // Show search results if searching, otherwise show popular people
  const displayData = query.length > 0 ? searchResults : (people ?? []);

  return (
    <SafeAreaView className="flex-1 bg-primary">
      {/* Header */}
      <View className="px-4 pt-2 pb-3">
        <Text className="text-white text-2xl font-bold text-center mb-3">
          Popular People
        </Text>

        {/* Search Bar */}
        <View className="flex-row items-center bg-dark-100 rounded-xl px-4 border border-dark-200">
          <TextInput
            className="flex-1 text-white py-3 text-sm"
            placeholder="Search people..."
            placeholderTextColor="#666"
            value={query}
            onChangeText={handleSearch}
          />
          {/* Clear button */}
          {query.length > 0 && (
            <TouchableOpacity onPress={() => handleSearch("")}>
              <Text className="text-gray-500 text-base px-1">✕</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Loading */}
      {loading || searching ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#AB8BFF" />
        </View>
      ) : // Error
      error ? (
        <View className="flex-1 justify-center items-center gap-3 px-8">
          <Text className="text-red-500 text-center">{error.message}</Text>
          <TouchableOpacity
            onPress={refetch}
            className="bg-accent px-6 py-2 rounded-full"
          >
            <Text className="text-white font-bold">Retry</Text>
          </TouchableOpacity>
        </View>
      ) : (
        // People Grid
        <FlatList
          data={displayData}
          keyExtractor={(item) => item.id.toString()}
          numColumns={3}
          contentContainerStyle={{ paddingHorizontal: 12, paddingBottom: 80 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{ width: CARD_WIDTH, margin: 6, alignItems: "center" }}
              onPress={() => router.push(`/people/${item.id}` as any)}
              activeOpacity={0.75}
            >
              {/* Person Photo */}
              {item.profile_path ? (
                <Image
                  source={{ uri: `${IMAGE_BASE}${item.profile_path}` }}
                  style={{
                    width: CARD_WIDTH,
                    height: CARD_WIDTH * 1.4,
                    borderRadius: 10,
                  }}
                  resizeMode="cover"
                />
              ) : (
                // No photo — show first letter of name
                <View
                  style={{
                    width: CARD_WIDTH,
                    height: CARD_WIDTH * 1.4,
                    borderRadius: 10,
                    backgroundColor: "#221f3d",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text className="text-accent text-4xl font-bold">
                    {item.name.charAt(0)}
                  </Text>
                </View>
              )}

              {/* Person Name */}
              <Text
                className="text-white text-xs font-semibold text-center mt-1"
                numberOfLines={2}
              >
                {item.name}
              </Text>

              {/* Department e.g. Acting */}
              <Text className="text-gray-500 text-xs text-center">
                {item.known_for_department}
              </Text>
            </TouchableOpacity>
          )}
        />
      )}
    </SafeAreaView>
  );
}

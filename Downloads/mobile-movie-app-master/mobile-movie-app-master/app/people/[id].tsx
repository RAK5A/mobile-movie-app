import {
    fetchPersonCredits,
    fetchPersonDetail,
    fetchPersonImages,
} from "@/services/api";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Dimensions,
    FlatList,
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");
const IMAGE_BASE_W342 = "https://image.tmdb.org/t/p/w342";
const IMAGE_BASE_W185 = "https://image.tmdb.org/t/p/w185";

export default function PersonDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const [person, setPerson] = useState<PersonDetail | null>(null);
  const [images, setImages] = useState<PersonImage[]>([]);
  const [credits, setCredits] = useState<PersonCredit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeImg, setActiveImg] = useState(0);

  // Load all person data when screen opens
  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);

        // Fetch detail, images and credits at the same time
        const [detail, imgs, creds] = await Promise.all([
          fetchPersonDetail(Number(id)),
          fetchPersonImages(Number(id)),
          fetchPersonCredits(Number(id)),
        ]);

        setPerson(detail);
        setImages(imgs.slice(0, 10)); // max 10 photos
        setCredits(
          // Sort credits by newest first
          [...creds].sort((a, b) =>
            (b.release_date || b.first_air_date || "0").localeCompare(
              a.release_date || a.first_air_date || "0",
            ),
          ),
        );
      } catch (e: unknown) {
        setError(e instanceof Error ? e.message : "Failed to load");
      } finally {
        setLoading(false);
      }
    };
    if (id) load();
  }, [id]);

  // Loading screen
  if (loading)
    return (
      <SafeAreaView className="flex-1 bg-primary justify-center items-center">
        <ActivityIndicator size="large" color="#AB8BFF" />
      </SafeAreaView>
    );

  // Error screen
  if (error || !person)
    return (
      <SafeAreaView className="flex-1 bg-primary justify-center items-center gap-4">
        <Text className="text-red-500 text-center px-8">{error}</Text>
        <TouchableOpacity
          onPress={() => router.back()}
          className="bg-accent px-6 py-2 rounded-full"
        >
          <Text className="text-white font-bold">Go Back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );

  // If no images use profile photo
  const displayImages =
    images.length > 0
      ? images
      : person.profile_path
        ? [{ file_path: person.profile_path, width: 342, height: 512 }]
        : [];

  return (
    <SafeAreaView className="flex-1 bg-primary">
      {/* Header with back button */}
      <View className="flex-row items-center px-4 py-3 border-b border-dark-200">
        <TouchableOpacity onPress={() => router.back()} className="w-10">
          <Text className="text-white text-2xl">←</Text>
        </TouchableOpacity>
        <Text
          className="text-white text-lg font-bold flex-1 text-center"
          numberOfLines={1}
        >
          {person.name}
        </Text>
        <View className="w-10" />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* Photo Carousel */}
        {displayImages.length > 0 && (
          <View className="mt-5 mb-2">
            <FlatList
              data={displayImages}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              snapToInterval={width * 0.55 + 16}
              decelerationRate="fast"
              contentContainerStyle={{
                paddingHorizontal: (width - width * 0.55) / 2,
              }}
              onMomentumScrollEnd={(e) =>
                setActiveImg(
                  Math.round(
                    e.nativeEvent.contentOffset.x / (width * 0.55 + 16),
                  ),
                )
              }
              keyExtractor={(item, i) => `${item.file_path}-${i}`}
              renderItem={({ item, index }) => (
                <View
                  style={{
                    width: width * 0.55,
                    marginHorizontal: 8,
                    borderRadius: 14,
                    overflow: "hidden",
                    // Active photo is bigger and brighter
                    opacity: index === activeImg ? 1 : 0.5,
                    transform: [{ scale: index === activeImg ? 1 : 0.92 }],
                  }}
                >
                  <Image
                    source={{ uri: `${IMAGE_BASE_W342}${item.file_path}` }}
                    style={{
                      width: "100%",
                      height: width * 0.75,
                      borderRadius: 14,
                    }}
                    resizeMode="cover"
                  />
                </View>
              )}
            />

            {/* Dot indicators */}
            {displayImages.length > 1 && (
              <View className="flex-row justify-center mt-3 gap-1">
                {displayImages.map((_, i) => (
                  <View
                    key={i}
                    style={{
                      width: i === activeImg ? 18 : 6,
                      height: 6,
                      borderRadius: 3,
                      backgroundColor: i === activeImg ? "#AB8BFF" : "#2a3447",
                    }}
                  />
                ))}
              </View>
            )}
          </View>
        )}

        {/* Biography Section */}
        <View className="px-5 mt-6">
          <Text className="text-white text-xl font-bold mb-3">Biography</Text>

          {/* Birthday */}
          {person.birthday && (
            <View className="flex-row mb-2">
              <Text className="text-gray-500 w-20 text-sm">🎂 Born</Text>
              <Text className="text-gray-300 text-sm flex-1">
                {new Date(person.birthday).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </Text>
            </View>
          )}

          {/* Place of birth */}
          {person.place_of_birth && (
            <View className="flex-row mb-2">
              <Text className="text-gray-500 w-20 text-sm">📍 From</Text>
              <Text className="text-gray-300 text-sm flex-1">
                {person.place_of_birth}
              </Text>
            </View>
          )}

          {/* Bio text */}
          <Text className="text-gray-300 text-sm leading-6 mt-2">
            {person.biography || "No biography available."}
          </Text>
        </View>

        {/* Credits Section */}
        {credits.length > 0 && (
          <View className="mt-6">
            <Text className="text-white text-xl font-bold px-5 mb-3">
              {person.known_for_department || "Acting"}
            </Text>
            <FlatList
              data={credits.slice(0, 20)} // show max 20 credits
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 20, gap: 12 }}
              keyExtractor={(item, i) => `${item.id}-${i}`}
              renderItem={({ item }) => (
                <View style={{ width: 100 }}>
                  {/* Movie/TV poster */}
                  {item.poster_path ? (
                    <Image
                      source={{
                        uri: `${IMAGE_BASE_W185}${item.poster_path}`,
                      }}
                      style={{ width: 100, height: 150, borderRadius: 8 }}
                      resizeMode="cover"
                    />
                  ) : (
                    // No poster fallback
                    <View
                      style={{
                        width: 100,
                        height: 150,
                        borderRadius: 8,
                        backgroundColor: "#221f3d",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text className="text-3xl">🎬</Text>
                    </View>
                  )}
                  {/* Title */}
                  <Text
                    className="text-gray-300 text-xs mt-1 text-center"
                    numberOfLines={2}
                  >
                    {item.title || item.name}
                  </Text>
                </View>
              )}
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

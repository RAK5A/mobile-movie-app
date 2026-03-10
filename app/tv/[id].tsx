import Trailer from "@/components/Trailer";
import { icons } from "@/constants/icons";
import { fetchTVDetails, fetchTVCast, fetchTVTrailer } from "@/services/api";
import useFetch from "@/services/usefetch";
import { images } from "@/constants/images";
import { LinearGradient } from "expo-linear-gradient";
import { router, useLocalSearchParams, Link } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const InfoChip = ({ text }: { text: string }) => (
  <View className="bg-white/10 px-3 py-1.5 rounded-xl border border-white/10">
    <Text className="text-white text-[10px] font-semibold uppercase tracking-wider">{text}</Text>
  </View>
);

const StatItem = ({ label, value }: { label: string; value: string | number }) => (
  <View className="flex-1 items-center">
    <Text className="text-light-200 text-[10px] uppercase tracking-tighter mb-1">{label}</Text>
    <Text className="text-white font-bold text-sm">{value}</Text>
  </View>
);

export default function TVDetail() {
  const { id } = useLocalSearchParams();
  const { data: tv, loading } = useFetch(
    () => fetchTVDetails(id as string),
    true,
    [id]
  );
  const { data: cast, loading: castLoading } = useFetch(
    () => fetchTVCast(id as string),
    true,
    [id]
  );

  const [modalVisible, setModalVisible] = useState(false);
  const [trailerKey, setTrailerKey] = useState<string | null>(null);
  const [loadingTrailer, setLoadingTrailer] = useState(false);

  const handlePlayPress = async () => {
    setLoadingTrailer(true);
    const key = await fetchTVTrailer(Number(id));
    setTrailerKey(key);
    setLoadingTrailer(false);
    setModalVisible(true);
  };

  if (loading)
    return (
      <SafeAreaView className="bg-primary flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#AB8BFF" />
      </SafeAreaView>
    );

  return (
    <View className="bg-primary flex-1">
      <Image
        source={images.bg}
        className="absolute inset-0 z-0"
        resizeMode="cover"
      />

      <ScrollView 
        contentContainerStyle={{ paddingBottom: 60 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Section */}
        <View className="relative w-full h-[600px]">
          <Image
            source={{
              uri: tv?.poster_path
                ? `https://image.tmdb.org/t/p/w780${tv.poster_path}`
                : `https://placehold.co/600x900/1a1a1a/ffffff.png?text=${encodeURIComponent(tv?.name || "TV Show")}`,
            }}
            className="w-full h-full"
            resizeMode="cover"
          />

          <LinearGradient
            colors={["rgba(3,0,20,0.1)", "rgba(3,0,20,0.4)", "#030014"]}
            className="absolute inset-0"
          />

          {/* Top Actions */}
          <SafeAreaView className="absolute top-0 left-0 right-0" edges={['top']}>
            <View className="flex-row items-center justify-between px-5 pt-2">
              <TouchableOpacity
                onPress={router.back}
                className="bg-black/40 w-11 h-11 rounded-full items-center justify-center border border-white/20"
              >
                <Ionicons name="chevron-back" size={24} color="#fff" />
              </TouchableOpacity>
              
              <TouchableOpacity
                className="bg-black/40 w-11 h-11 rounded-full items-center justify-center border border-white/20"
              >
                <Ionicons name="heart-outline" size={24} color="#fff" />
              </TouchableOpacity>
            </View>
          </SafeAreaView>

          {/* Play Button Overlay */}
          <View className="absolute inset-0 items-center justify-center">
            <TouchableOpacity
              onPress={handlePlayPress}
              disabled={loadingTrailer}
              className="w-20 h-20 rounded-full bg-accent/90 items-center justify-center shadow-xl shadow-accent/50"
            >
              {loadingTrailer ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Ionicons name="play" size={36} color="#fff" className="ml-1" />
              )}
            </TouchableOpacity>
          </View>

          {/* Bottom Info Section */}
          <View className="absolute bottom-0 left-0 right-0 px-5 pb-8">
            <View className="flex-row items-center gap-x-2 mb-3">
              <InfoChip text={tv?.first_air_date ? tv.first_air_date.split("-")[0] : "N/A"} />
              <InfoChip text={`${tv?.number_of_seasons || 0} Seasons`} />
              <View className="flex-row items-center bg-accent/20 px-2 py-1 rounded-lg border border-accent/30">
                <Ionicons name="star" size={12} color="#AB8BFF" />
                <Text className="text-accent text-[10px] font-bold ml-1">
                  {tv?.vote_average.toFixed(1)}
                </Text>
              </View>
            </View>

            <Text className="text-white text-4xl font-black mb-4 leading-none" numberOfLines={2}>
              {tv?.name}
            </Text>

            <View className="flex-row flex-wrap gap-2">
              {tv?.genres.map((genre) => (
                <Text key={genre.id} className="text-light-200 text-xs font-medium">
                  • {genre.name}
                </Text>
              ))}
            </View>
          </View>
        </View>

        {/* Content Section */}
        <View className="px-5 mt-6">
          {/* Stats Grid */}
          <View className="flex-row bg-dark-100/50 rounded-2xl py-5 border border-white/5 mb-8">
            <StatItem 
              label="Episodes" 
              value={tv?.number_of_episodes || "N/A"} 
            />
            <View className="w-[1px] h-8 bg-white/10" />
            <StatItem 
              label="Status" 
              value={tv?.first_air_date ? "Released" : "N/A"} 
            />
            <View className="w-[1px] h-8 bg-white/10" />
            <StatItem 
              label="Votes" 
              value={tv?.vote_count?.toLocaleString() || "0"} 
            />
          </View>

          {/* Overview */}
          <View className="mb-8">
            <Text className="text-white font-bold text-xl mb-3">Storyline</Text>
            <Text className="text-light-200 text-sm leading-6 text-justify">
              {tv?.overview || "No overview available."}
            </Text>
          </View>

          {/* Cast */}
          <View className="mb-8">
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-xl text-white font-bold">Top Cast</Text>
              <TouchableOpacity>
                <Text className="text-accent text-xs font-semibold">See All</Text>
              </TouchableOpacity>
            </View>
            
            {castLoading ? (
              <ActivityIndicator color="#AB8BFF" />
            ) : (
              <FlatList
                data={cast}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => `cast-${item.id}`}
                contentContainerStyle={{ gap: 15 }}
                renderItem={({ item }) => (
                  <Link href={`/people/${item.id}`} asChild>
                    <TouchableOpacity className="w-24">
                      <Image
                        source={{
                          uri: item.profile_path
                            ? `https://image.tmdb.org/t/p/w185${item.profile_path}`
                            : `https://placehold.co/200x300/1a1a1a/ffffff.png?text=${encodeURIComponent(item.name)}`,
                        }}
                        className="w-24 h-24 rounded-full border-2 border-white/10"
                        resizeMode="cover"
                      />
                      <View className="mt-2 items-center">
                        <Text className="text-white text-[10px] font-bold text-center" numberOfLines={1}>
                          {item.name}
                        </Text>
                        <Text className="text-light-200 text-[9px] text-center" numberOfLines={1}>
                          {item.character}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </Link>
                )}
              />
            )}
          </View>

          {/* Production Companies */}
          <View className="mb-10 p-5 bg-dark-100/50 rounded-3xl border border-white/5">
            <Text className="text-light-200 text-[10px] uppercase tracking-widest mb-3">Production</Text>
            <Text className="text-white text-sm font-medium leading-5">
              {tv?.production_companies?.map((c) => c.name).join(" • ") || "N/A"}
            </Text>
          </View>
        </View>
      </ScrollView>

      <Trailer
        visible={modalVisible}
        trailerKey={trailerKey}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
}

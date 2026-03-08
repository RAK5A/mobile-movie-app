import Trailer from "@/components/Trailer";
import { icons } from "@/constants/icons";
import {
  fecthMovieDetails,
  fetchMovieCast,
  fetchMovieTrailer,
} from "@/services/api";
import useFetch from "@/services/usefetch";
import { LinearGradient } from "expo-linear-gradient";
import { router, useLocalSearchParams } from "expo-router";
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

export default function MovieDetail() {
  const { id } = useLocalSearchParams();
  const { data: movie, loading } = useFetch(() =>
    fecthMovieDetails(id as string),
  );
  const { data: cast, loading: castLoading } = useFetch(() =>
    fetchMovieCast(id as string),
  );

  const [modalVisible, setModalVisible] = useState(false);
  const [trailerKey, setTrailerKey] = useState<string | null>(null);
  const [loadingTrailer, setLoadingTrailer] = useState(false);

  const handlePlayPress = async () => {
    setLoadingTrailer(true);
    const key = await fetchMovieTrailer(Number(id));
    setTrailerKey(key);
    setLoadingTrailer(false);
    setModalVisible(true);
  };

  if (loading)
    return (
      <SafeAreaView className="bg-primary flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#ab8bff" />
      </SafeAreaView>
    );

  return (
    <SafeAreaView className="bg-primary flex-1">
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <View className="relative">
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}`,
            }}
            className="w-full h-[420px]"
            resizeMode="cover"
          />

          <LinearGradient
            colors={["transparent", "rgba(3,0,20,0.85)", "#030014"]}
            className="absolute bottom-0 left-0 right-0 h-48"
          />

          <TouchableOpacity
            onPress={router.back}
            className="absolute top-4 left-4 bg-black/40 rounded-full w-10 h-10 items-center justify-center"
          >
            <Image
              source={icons.arrow}
              className="size-5 rotate-180"
              tintColor="#fff"
            />
          </TouchableOpacity>

          {/* Centered play button on poster */}
          <View className="absolute bottom-10 left-0 right-0 items-center">
            <TouchableOpacity
              onPress={handlePlayPress}
              disabled={loadingTrailer}
              className="w-14 h-14 rounded-full bg-white/20 border border-white/60 items-center justify-center"
            >
              {loadingTrailer ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Image
                  source={icons.play}
                  className="w-5 h-5 ml-1"
                  resizeMode="contain"
                  tintColor="#fff"
                />
              )}
            </TouchableOpacity>
          </View>
        </View>

        <View className="px-5 -mt-2">
          <Text className="text-light-200 text-sm">
            {movie?.release_date
              ? new Date(movie.release_date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })
              : "N/A"}
          </Text>

          <Text className="text-white text-2xl font-bold mt-1">
            {movie?.title}
          </Text>

          <View className="flex-row gap-2 mt-3">
            <View className="bg-white/10 px-3 py-1 rounded-full border border-white/20">
              <Text className="text-white text-xs">{movie?.runtime} min</Text>
            </View>
          </View>

          {/* Genre */}
          <View className="flex-row flex-wrap gap-2 mt-3">
            {movie?.genres.map((genre) => (
              <View
                key={genre.id}
                className="bg-white/10 px-3 py-1 rounded-full border border-white/20"
              >
                <Text className="text-white text-xs">{genre.name}</Text>
              </View>
            ))}
          </View>

          {/* Rating */}
          <View className="flex-row items-center gap-x-2 mt-4">
            <Image source={icons.star} className="size-5" />
            <Text className="text-white font-bold text-base">
              {movie?.vote_average.toFixed(1)}/10
            </Text>
            <Text className="text-light-200 text-sm">
              {movie?.vote_count?.toLocaleString()} votes
            </Text>
          </View>

          {/* Budget & Revenue */}
          <View className="flex-row gap-x-8 mt-4">
            <View>
              <Text className="text-light-200 text-xs">Budget</Text>
              <Text className="text-white font-bold text-sm mt-0.5">
                ${((movie?.budget ?? 0) / 1_000_000).toFixed(1)} M
              </Text>
            </View>
            <View>
              <Text className="text-light-200 text-xs">Revenue</Text>
              <Text className="text-white font-bold text-sm mt-0.5">
                ${Math.round((movie?.revenue ?? 0) / 1_000_000)} M
              </Text>
            </View>
          </View>

          {/* Cast */}
          <View className="mt-6">
            <View className="flex-row items-center justify-between mb-2 mt-6">
              <Text className="text-lg text-white font-bold">Cast</Text>
              <TouchableOpacity>
                <View className="flex-row gap-x-2">
                  <Text className="text-sm font-medium text-white">
                    See All
                  </Text>
                  <Image
                    source={icons.arrow}
                    className="size-5"
                    tintColor="#fff"
                  />
                </View>
              </TouchableOpacity>
            </View>
            {castLoading ? (
              <ActivityIndicator color="#ab8bff" />
            ) : (
              <FlatList
                data={cast}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={{ gap: 10 }}
                renderItem={({ item }) => (
                  <TouchableOpacity>
                    <View className="w-24 rounded-xl overflow-hidden bg-dark-100">
                      <Image
                        source={{
                          uri: item.profile_path
                            ? `https://image.tmdb.org/t/p/w185${item.profile_path}`
                            : `https://placehold.co/100x150/1a1a1a/ffffff.png`,
                        }}
                        className="w-full h-32"
                        resizeMode="cover"
                      />
                      <View className="p-1.5">
                        <Text
                          className="text-white text-xs font-bold"
                          numberOfLines={1}
                        >
                          {item.name}
                        </Text>
                        <Text
                          className="text-light-200 text-xs mt-0.5"
                          numberOfLines={1}
                        >
                          {item.character}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                )}
              />
            )}
          </View>

          {/* Overview */}
          <View className="mt-6">
            <Text className="text-white font-bold text-lg mb-2">Overview</Text>
            <Text className="text-light-200 text-sm leading-6">
              {movie?.overview || "N/A"}
            </Text>
          </View>

          {/* Production */}
          <View className="mt-5">
            <Text className="text-light-200 text-xs">Production</Text>
            <Text className="text-white text-sm mt-1">
              {movie?.production_companies.map((c) => c.name).join(" • ") ||
                "N/A"}
            </Text>
          </View>
        </View>
      </ScrollView>

      <Trailer
        visible={modalVisible}
        trailerKey={trailerKey}
        onClose={() => setModalVisible(false)}
      />
    </SafeAreaView>
  );
}

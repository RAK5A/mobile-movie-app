import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import useFetch from "@/services/usefetch";
import {
  fetchTVShowCast,
  fetchTVShowsDetail,
  fetchTVShowTrailer,
} from "@/services/api";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { icons } from "@/constants/icons";
import Trailer from "@/components/Trailer";

export default function TVShowDetail() {
  const { id } = useLocalSearchParams();
  const { data: tvshow, loading } = useFetch(() =>
    fetchTVShowsDetail(id as string),
  );

  const {
    data: cast,
    loading: castLoading,
    error: castError,
  } = useFetch(() => fetchTVShowCast(id as string));

  const [modalVisible, setModalVisible] = useState(false);
  const [trailerKey, setTrailerKey] = useState<string | null>(null);
  const [loadingTrailer, setLoadingTrailer] = useState(false);

  const handlePlayPress = async () => {
    setLoadingTrailer(true);
    const key = await fetchTVShowTrailer(Number(id));
    setTrailerKey(key);
    setLoadingTrailer(false);
    setModalVisible(true);
  };

  if (loading)
    return (
      <SafeAreaView>
        <ActivityIndicator size="large" color="#ab8bff" />
      </SafeAreaView>
    );

  return (
    <SafeAreaView className="bg-primary flex-1">
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <View className="relative">
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${tvshow?.poster_path}`,
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

        {/* Info */}
        <View className="px-5 -mt-2">
          <Text className="text-light-200 text-sm">
            {/* {tvshow?.first_air_date
              ? new Date(tvshow.first_air_date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })
              : "N/A"} */}
            {tvshow?.first_air_date.split("-")[0]}
          </Text>
          <Text className="text-white text-2xl font-bold mt-1">
            {tvshow?.name}
          </Text>
          <View className="flex-row gap-2 mt-3">
            <View className="bg-white/10 px-3 py-1 rounded-full border border-white/20">
              <Text className="text-white text-xs">
                {tvshow?.episode_run_time} min
              </Text>
            </View>
          </View>
          <View className="flex-row flex-wrap gap-2 mt-3">
            {tvshow?.genres.map((genre) => (
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
              {tvshow?.vote_average.toFixed(1)}/10
            </Text>
            <Text className="text-light-200 text-sm">
              {tvshow?.vote_count?.toLocaleString()} votes
            </Text>
          </View>

          {/* Status & Total Season/Episode */}
          <View className="flex-row gap-x-8 mt-4">
            <View>
              <Text className="text-light-200 text-sm">Status</Text>
              <Text className="text-white font-bold text-sm mt-0.5">
                {tvshow?.status}
              </Text>
            </View>
            <View>
              <Text className="text-light-200 text-sm">Total Season</Text>
              <Text className="text-white font-bold text-sm mt-0.5">
                {tvshow?.seasons.length}
              </Text>
            </View>
            <View>
              <Text className="text-light-200 text-sm">Total Episodes</Text>
              <Text className="text-white font-bold text-sm mt-0.5">
                {tvshow?.number_of_episodes}
              </Text>
            </View>
          </View>

          {/* tagline & overview */}
          <View className="mt-6">
            <Text className="text-white font-bold text-lg mb-2">Overview</Text>
            <Text className="text-light-200 text-sm mb-4 italic">
              {tvshow?.tagline}
            </Text>
            <Text className="text-gray-100 text-sm leading-6">
              {tvshow?.overview || "N/A"}
            </Text>
          </View>

          {/* Cast */}
          <View className="mt-2">
            <View className="flex-row items-center justify-between mb-2 mt-6">
              <Text className="text-lg text-white font-bold">Cast</Text>
              <TouchableOpacity
                onPress={() =>
                  router.push(`/tv_shows/cast?id=${id}&name=${tvshow?.name}`)
                }
              >
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
                  <TouchableOpacity
                    onPress={() => router.push(`/people/${item.id}`)}
                  >
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
                ListEmptyComponent={
                  !castLoading && !castError ? (
                    <Text className="text-center text-gray-400 mt-5">
                      No casts found
                    </Text>
                  ) : null
                }
              />
            )}
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

import Trailer from "@/components/Trailer";
import { icons } from "@/constants/icons";
import { fecthMovieDetails, fetchMovieTrailer } from "@/services/api";
import useFetch from "@/services/usefetch";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface MovieInfoProps {
  label: string;
  value: string;
}

export default function MovieDetail() {
  const { id } = useLocalSearchParams();
  const { data: movie, loading } = useFetch(() =>
    fecthMovieDetails(id as string),
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

  const MovieInfo = ({ label, value }: MovieInfoProps) => (
    <View className="flex-col items-start justify-center mt-5">
      <Text className="text-light-200 font-normal text-sm">{label}</Text>
      <Text className="text-light-100 font-bold text-sm mt-2">
        {value || "N/A"}
      </Text>
    </View>
  );

  if (loading)
    return (
      <SafeAreaView className="bg-primary flex-1">
        <ActivityIndicator />
      </SafeAreaView>
    );

  return (
    <View className="bg-primary flex-1">
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <View>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}`,
            }}
            className="w-full h-[550px]"
            resizeMode="stretch"
          />

          <TouchableOpacity
            onPress={handlePlayPress}
            disabled={loadingTrailer}
            className="absolute bottom-5 right-5 rounded-full size-14 bg-white flex items-center justify-center"
          >
            {loadingTrailer ? (
              <ActivityIndicator size="small" color="#000" />
            ) : (
              <Image
                source={icons.play}
                className="w-6 h-7 ml-1"
                resizeMode="stretch"
              />
            )}
          </TouchableOpacity>
        </View>

        <View className="flex-col items-start justify-center mt-5 px-5">
          <Text className="text-white font-bold">{movie?.title}</Text>
          <View className="flex-row items-center gap-x-1 mt-2">
            <Text className="text-light-200 text-sm">
              {movie?.release_date?.split("-")[0]} •
            </Text>
            <Text className="text-light-200 text-sm">{movie?.runtime} min</Text>
          </View>
        </View>

        <View className="flex-row items-center bg-dark-100 py-1 px-2 rounded-md gap-x-1 mt-2">
          <Image source={icons.star} className="size-4" />
          <Text className="text-white font-bold text-sm">
            {Math.round(movie?.vote_average ?? 0)}/10{" "}
          </Text>
          <Text className="text-light-200 text-sm">
            ({movie?.vote_count} vote)
          </Text>
        </View>

        <MovieInfo label="Overview" value={movie?.overview || "N/A"} />
        <MovieInfo
          label="Genres"
          value={movie?.genres.map((genre) => genre.name).join(" • ") || "N/A"}
        />

        <View className="flex flex-row justify-between w-1/2">
          <MovieInfo
            label="Budget"
            value={`$${(movie?.budget ?? 0) / 1_000_000} million`}
          />

          <MovieInfo
            label="Revenue"
            value={`$${Math.round((movie?.revenue ?? 0) / 1_000_000)} million`}
          />
        </View>

        <MovieInfo
          label="Production Companies"
          value={
            movie?.production_companies
              .map((company) => company.name)
              .join(" • ") || "N/A"
          }
        />
      </ScrollView>

      <TouchableOpacity
        className="absolute bottom-5 left-0 right-0 mx-5 bg-accent rounded-lg py-3.5 flex flex-row items-center justify-center z-50"
        onPress={router.back}
      >
        <Image
          source={icons.arrow}
          className="size-5 mr-1 mt-0.5 rotate-180"
          tintColor="#fff"
        />
        <Text className="text-white font-bold text-base">Go Back</Text>
      </TouchableOpacity>

      <Trailer
        visible={modalVisible}
        trailerKey={trailerKey}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
}

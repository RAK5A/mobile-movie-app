import React, { useState } from "react";
import { fetchPersonDetails, fetchPersonCredits } from "@/services/api";
import useFetch from "@/services/usefetch";
import { router, useLocalSearchParams } from "expo-router";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Linking,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MovieCard from "@/components/MovieCard";
import { Ionicons } from "@expo/vector-icons";
import { images } from "@/constants/images";

// collapsible biography section
function BiographySection({ bio }: { bio: string }) {
  const [expanded, setExpanded] = useState(false);
  const preview = bio.length > 300 ? bio.slice(0, 300) + "..." : bio;
  return (
    <View className="mt-6">
      <Text className="text-white font-bold text-xl mb-3">Biography</Text>
      <View className="bg-dark-100/80 p-4 rounded-2xl border border-white/5">
        <Text className="text-light-200 text-sm leading-6 text-justify">
          {expanded ? bio : preview}
        </Text>
        {bio.length > 300 && (
          <TouchableOpacity 
            onPress={() => setExpanded(!expanded)}
            className="mt-3 flex-row items-center"
          >
            <Text className="text-accent font-semibold text-sm mr-1">
              {expanded ? "Show less" : "Read more"}
            </Text>
            <Ionicons 
              name={expanded ? "chevron-up" : "chevron-down"} 
              size={14} 
              color="#AB8BFF" 
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const InfoItem = ({ label, value }: { label: string; value: string }) => (
  <View className="flex-1 min-w-[45%] mb-4">
    <Text className="text-light-200 text-xs uppercase tracking-wider mb-1">{label}</Text>
    <Text className="text-white text-sm font-medium">{value}</Text>
  </View>
);

export default function PersonDetail() {
  const { id } = useLocalSearchParams();
  const { data: person, loading, error } = useFetch(
    () => id ? fetchPersonDetails(id as string) : Promise.reject(new Error("No id")),
    true,
    [id]
  );
  const {
    data: credits,
    loading: creditsLoading,
  } = useFetch(
    () => fetchPersonCredits(id as string),
    true,
    [id]
  );

  if (loading)
    return (
      <View className="bg-primary flex-1 items-center justify-center">
        <Image source={images.bg} className="absolute inset-0 z-0" resizeMode="cover" />
        <ActivityIndicator size="large" color="#AB8BFF" />
      </View>
    );

  if (error)
    return (
      <View className="bg-primary flex-1 items-center justify-center">
        <Image source={images.bg} className="absolute inset-0 z-0" resizeMode="cover" />
        <Text className="text-red-400">{error.message}</Text>
      </View>
    );

  const birthDate = person?.birthday ? new Date(person.birthday) : null;
  const age = birthDate && !person?.deathday 
    ? Math.floor((Date.now() - birthDate.getTime()) / 31557600000)
    : null;

  return (
    <View className="flex-1 bg-primary">
      <Image
        source={images.bg}
        className="absolute inset-0 z-0"
        resizeMode="cover"
      />

      <ScrollView 
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        className="flex-1"
      >
        {/* Header Navigation - uses SafeAreaView for top edge only */}
        <SafeAreaView edges={['top']}>
          <View className="flex-row items-center justify-between px-5 py-4">
            <TouchableOpacity 
              onPress={router.back}
              className="bg-black/40 w-11 h-11 rounded-full items-center justify-center border border-white/10"
            >
              <Ionicons name="chevron-back" size={24} color="#fff" />
            </TouchableOpacity>
            <Text className="text-white font-bold text-lg">Profile</Text>
            <View className="w-11" />
          </View>
        </SafeAreaView>

        {/* Hero Section */}
        <View className="px-5 items-center mt-4">
          <View className="relative">
            <View className="absolute -inset-1 bg-accent/30 rounded-[32px] blur-xl" />
            <Image
              source={{
                uri: person?.profile_path
                  ? `https://image.tmdb.org/t/p/w500${person.profile_path}`
                  : `https://placehold.co/185x278/1a1a1a/ffffff.png?text=${encodeURIComponent(person?.name || "")}`,
              }}
              className="w-44 h-64 rounded-[28px] bg-dark-200 border-2 border-white/10"
              resizeMode="cover"
            />
          </View>
          
          <Text className="text-white text-3xl font-extrabold mt-6 text-center">
            {person?.name}
          </Text>
          <Text className="text-accent text-sm font-semibold tracking-widest uppercase mt-1">
            {person?.known_for_department}
          </Text>
        </View>

        <View className="px-5 mt-8">
          {/* Quick Info Grid */}
          <View className="bg-dark-100/80 p-5 rounded-3xl border border-white/5 flex-row flex-wrap">
            {person?.birthday && (
              <InfoItem 
                label="Born" 
                value={`${birthDate?.toLocaleDateString()} ${age ? `(${age} years)` : ""}`} 
              />
            )}
            {person?.deathday && (
              <InfoItem 
                label="Died" 
                value={new Date(person.deathday).toLocaleDateString()} 
              />
            )}
            {person?.place_of_birth && (
              <InfoItem label="Birthplace" value={person.place_of_birth} />
            )}
            {person?.homepage && (
              <TouchableOpacity 
                className="flex-1 min-w-[45%]"
                onPress={() => Linking.openURL(person.homepage!)}
              >
                <Text className="text-light-200 text-xs uppercase tracking-wider mb-1">Website</Text>
                <Text className="text-accent text-sm font-medium">Visit Official Site</Text>
              </TouchableOpacity>
            )}
          </View>

          {person?.biography ? (
            <BiographySection bio={person.biography} />
          ) : null}

          {/* Credits Section */}
          <View className="mt-8">
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-xl text-white font-bold">Known For</Text>
            </View>

            {creditsLoading ? (
              <ActivityIndicator color="#AB8BFF" />
            ) : (
              <View>
                {/* Movies */}
                <View className="mb-6">
                  <View className="flex-row items-center mb-3">
                    <View className="w-1 h-4 bg-accent rounded-full mr-2" />
                    <Text className="text-white font-bold text-base">Movies</Text>
                  </View>
                  <FlatList
                    data={credits
                      ?.filter((c) => c.mediaType === "movie")
                      .filter((c, index, self) => self.findIndex(t => t.id === c.id) === index)
                      .sort((a, b) => {
                        const da = new Date(a.release_date).getTime() || 0;
                        const db = new Date(b.release_date).getTime() || 0;
                        return db - da;
                      })
                      .slice(0, 15)}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => `movie-${item.id}`}
                    contentContainerStyle={{ gap: 12 }}
                    renderItem={({ item }) => (
                      <MovieCard {...item} containerClassName="w-32" />
                    )}
                  />
                </View>

                {/* TV Shows */}
                {credits?.some(c => c.mediaType === "tv") && (
                  <View>
                    <View className="flex-row items-center mb-3">
                      <View className="w-1 h-4 bg-accent rounded-full mr-2" />
                      <Text className="text-white font-bold text-base">TV Shows</Text>
                    </View>
                    <FlatList
                      data={credits
                        ?.filter((c) => c.mediaType === "tv")
                        .filter((c, index, self) => self.findIndex(t => t.id === c.id) === index)
                        .sort((a, b) => {
                          const da = new Date(a.release_date).getTime() || 0;
                          const db = new Date(b.release_date).getTime() || 0;
                          return db - da;
                        })
                        .slice(0, 15)}
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      keyExtractor={(item) => `tv-${item.id}`}
                      contentContainerStyle={{ gap: 12 }}
                      renderItem={({ item }) => (
                        <MovieCard {...item} mediaType="tv" containerClassName="w-32" />
                      )}
                    />
                  </View>
                )}
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

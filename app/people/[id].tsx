import ExpandableSection from "@/components/ExpandableSection";
import PosterCard from "@/components/PosterCard";
import { icons } from "@/constants/icons";
import {
  fetchPersonDetails,
  fetchPersonMovies,
  fetchPersonTVShows,
} from "@/services/api";
import useFetch from "@/services/usefetch";
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

export default function PersonDetail() {
  const { id } = useLocalSearchParams();
  const [isExpanded, setIsExpanded] = useState(false);

  const { data: person, loading } = useFetch(() =>
    fetchPersonDetails(id as string),
  );
  const { data: movies, loading: moviesLoading } = useFetch(() =>
    fetchPersonMovies(id as string),
  );

  const { data: tvShows, loading: tvLoading } = useFetch(() =>
    fetchPersonTVShows(id as string),
  );

  if (loading)
    return (
      <SafeAreaView className="bg-primary flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#ab8bff" />
      </SafeAreaView>
    );

  return (
    <SafeAreaView className="bg-primary flex-1">
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Header */}
        <View className="px-5 pt-4 flex-row items-center gap-x-3 mb-5">
          <TouchableOpacity
            onPress={router.back}
            className="bg-white/10 rounded-full w-10 h-10 items-center justify-center"
          >
            <Image
              source={icons.arrow}
              className="size-5 rotate-180"
              tintColor="#fff"
            />
          </TouchableOpacity>
          <Text className="text-white font-bold text-xl">Profile</Text>
        </View>

        <View className="px-5 flex-row gap-x-4">
          {/* Photo */}
          <View
            className="rounded-2xl overflow-hidden border border-white/10"
            style={{ width: 130, height: 180 }}
          >
            <Image
              source={{
                uri: person?.profile_path
                  ? `https://image.tmdb.org/t/p/w300${person.profile_path}`
                  : `https://placehold.co/300x450/1a1a1a/ffffff.png`,
              }}
              className="w-full h-full"
              resizeMode="cover"
            />
          </View>

          {/* Info */}
          <View className="flex-1 justify-center gap-y-2">
            <Text className="text-white text-xl font-bold" numberOfLines={2}>
              {person?.name}
            </Text>

            {/* Know for Department */}
            {person?.known_for_department && (
              <View className="flex-row items-center gap-x-1">
                <Text className="text-light-200 text-sm">Known For</Text>
                <Text className="text-white text-sm px-1">
                  {person.known_for_department
                    ? person.known_for_department
                    : "N/A"}
                </Text>
              </View>
            )}

            {/* Birthday */}
            {person?.birthday && (
              <View className="flex-row items-center gap-x-1">
                <Text className="text-light-200 text-sm">Birthday</Text>
                <Text className="text-white text-sm px-1">
                  {/* {person.birthday ? person.birthday: "N/A"} */}
                  {person.birthday
                    ? new Date(person.birthday).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })
                    : "N/A"}
                </Text>
              </View>
            )}

            {/* Birthplace */}
            {/* {person?.place_of_birth && (
              <View className="flex-row items-center gap-x-1">
                <Text className="text-light-200 text-sm">Place of Birth</Text>
                <Text className="text-white text-sm px-1" numberOfLines={2}>
                  {person.place_of_birth ? person.place_of_birth : "N/A"}
                </Text>
              </View>
            )} */}
            <View className="flex-col gap-y-1 mt-1">
              <Text className="text-light-200 text-sm">Place of Birth</Text>
              <Text className="text-white text-sm" numberOfLines={3}>
                {person?.place_of_birth || "N/A"}
              </Text>
            </View>
          </View>
        </View>

        <View className="px-5 mt-6">
          {/* Also known as */}
          {person?.also_known_as?.length > 0 && (
            <View className="mb-5">
              <Text className="text-white font-bold text-base mb-2">
                Also Known As
              </Text>
              <View className="flex-row flex-wrap gap-2">
                {person.also_known_as
                  .slice(0, 5)
                  .map((name: string, index: number) => (
                    <View
                      key={index}
                      className="bg-white/10 border border-white/20 px-3 py-1 rounded-full"
                    >
                      <Text className="text-white text-xs">{name}</Text>
                    </View>
                  ))}
              </View>
            </View>
          )}

          {/* Biography */}
          <View className="mt-5">
            <Text className="text-white font-bold text-lg mb-2">Biography</Text>

            <Text
              numberOfLines={isExpanded ? undefined : 5}
              className="text-light-200 text-sm leading-6"
            >
              {person?.biography || "No biography available."}
            </Text>

            {person?.biography && person.biography.length > 100 && (
              <TouchableOpacity
                onPress={() => setIsExpanded(!isExpanded)}
                className="flex-row items-center justify-center mt-2"
              >
                <Text className="text-[#ab8bff] font-semibold mr-1">
                  {isExpanded ? "Show Less" : "Read More"}
                </Text>
                <Image
                  source={icons.arrow}
                  className={`size-4 ${isExpanded ? "rotate-[270deg]" : "rotate-90"}`}
                  tintColor="#ab8bff"
                />
              </TouchableOpacity>
            )}
          </View>

          {/* Feature in */}
          <View className="mt-6">
            {/* Movies */}
            <ExpandableSection title="Movies" count={movies?.length ?? 0}>
              {moviesLoading ? (
                <ActivityIndicator color="#ab8bff" />
              ) : (movies?.length ?? 0) > 0 ? (
                <FlatList
                  data={movies}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  keyExtractor={(item, index) => `movie-${item.id}-${index}`}
                  contentContainerStyle={{ gap: 16 }}
                  renderItem={({ item }) => (
                    <PosterCard
                      {...item}
                      containerClassName="w-28"
                      type="movie"
                    />
                  )}
                />
              ) : (
                <Text className="text-light-200 text-sm">No movies found</Text>
              )}
            </ExpandableSection>

            {/* TV Show */}
            <ExpandableSection title="TV Shows" count={tvShows?.length ?? 0}>
              {tvLoading ? (
                <ActivityIndicator color="#ab8bff" />
              ) : (tvShows?.length ?? 0) > 0 ? (
                <FlatList
                  data={tvShows}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  keyExtractor={(item, index) => `tv-${item.id}-${index}`}
                  contentContainerStyle={{ gap: 16 }}
                  renderItem={({ item }) => (
                    <PosterCard {...item} containerClassName="w-28" type="tv" />
                  )}
                />
              ) : (
                <Text className="text-light-200 text-sm">
                  No TV shows found
                </Text>
              )}
            </ExpandableSection>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

import { icons } from "@/constants/icons";
import { router } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import PosterCard from "./PosterCard";

interface TVShowSectionProps {
  title: string;
  data: TVShow[] | null;
  loading: boolean;
  error: Error | null;
  category: string;
}

export default function TVShowSection({
  title,
  data,
  loading,
  error,
  category,
}: TVShowSectionProps) {
  return (
    <View>
      <View className="flex-row items-center justify-between mt-5 mb-3">
        <Text className="text-lg text-white font-bold">{title}</Text>
        <TouchableOpacity
          onPress={() =>
            router.push(`/tv_shows/see_all?category=${category}&title=${title}`)
          }
        >
          <View className="flex-row gap-x-2">
            <Text className="text-sm font-medium text-white">See All</Text>
            <Image source={icons.arrow} className="size-5" tintColor="#fff" />
          </View>
        </TouchableOpacity>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#fff" className="my-3" />
      ) : error ? (
        <Text className="text-red-500">
          Failed to load {title.toLowerCase()}
        </Text>
      ) : (
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <PosterCard {...item} containerClassName="w-32" type="tv" />
          )}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 16, paddingRight: 5 }}
        />
      )}
    </View>
  );
}

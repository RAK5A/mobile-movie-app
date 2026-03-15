import { Link } from "expo-router";
import React from "react";
import { Image, Pressable, Text } from "react-native";

export default function PersonCard({
  id,
  name,
  profile_path,
  known_for_department,
}: Person) {
  return (
    <>
      <Link href={`/people/${id}`} asChild>
        <Pressable className="w-[30%] items-center">
          <Image
            source={{
              uri: profile_path
                ? `https://image.tmdb.org/t/p/w185${profile_path}`
                : `https://placehold.co/100x150/1a1a1a/ffffff.png`,
            }}
            className="w-full h-52 rounded-lg"
            resizeMode="cover"
          />

          <Text className="font-bold text-sm text-white mt-2" numberOfLines={1}>
            {name}
          </Text>

          <Text className="text-light-200 text-xs text-center mt-0.5">
            {known_for_department}
          </Text>
        </Pressable>
      </Link>
    </>
  );
}

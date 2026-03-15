import { icons } from "@/constants/icons";
import { Link } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";

type PosterCardProps = {
  id: number;
  poster_path: string | null;
  title?: string; // movie
  name?: string; // tv show
  vote_average: number;
  release_date?: string; // movie
  first_air_date?: string; // tv show
  containerClassName?: string;
  type?: "movie" | "tv"; // ← to know which route to navigate to
};

export default function PosterCard({
  id,
  poster_path,
  title,
  name,
  vote_average,
  release_date,
  first_air_date,
  containerClassName,
  type = "movie",
}: PosterCardProps) {
  const displayTitle = title ?? name ?? "Unknown";
  const displayYear = (release_date ?? first_air_date)?.split("-")[0] ?? "N/A";
  const href = type === "tv" ? `/tv_shows/${id}` : `/movies/${id}`; // route of project

  return (
    <>
      <Link href={href as any} asChild>
        <Pressable className={containerClassName ?? "w-[30%]"}>
          <View>
            <Image
              source={{
                uri: poster_path
                  ? `https://image.tmdb.org/t/p/w500${poster_path}`
                  : `https://placehold.co/600x400/1a1a1a/ffffff.png`,
              }}
              className="w-full h-52 rounded-lg"
              resizeMode="cover"
            />
          </View>

          <Text className="font-bold text-sm text-white mt-2" numberOfLines={1}>
            {displayTitle}
          </Text>

          <View className="mt-3 flex-row justify-between">
            <View className="flex-row items-center justify-start gap-x-1">
              <Image source={icons.star} className="size-4" />
              <Text className="text-xs text-white font-bold uppercase">
                {(vote_average ?? 0).toFixed(1)}
              </Text>
            </View>
            <Text className="text-xs text-light-200 font-medium mt-1">
              {displayYear}
            </Text>
          </View>
        </Pressable>
      </Link>
    </>
  );
}

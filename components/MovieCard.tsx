import { icons } from "@/constants/icons";
import { Link } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";

interface MovieCardProps extends Movie {
  containerClassName?: string;
  mediaType?: "movie" | "tv"; // default movie
}

export default function MovieCard({
  id,
  poster_path,
  title,
  vote_average = 0,
  release_date = "",
  containerClassName,
  mediaType = "movie",
}: MovieCardProps) {
  const href = mediaType === "tv" ? `/tv/${id}` : `/movies/${id}`;

  return (
    <>
      <Link href={href} asChild>
        {/* <Pressable className="w-[30%]"> */}
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
            {title}
          </Text>

          <View className="mt-3 flex-row justify-between">
            <View className="flex-row items-center justify-start gap-x-1">
              <Image source={icons.star} className="size-4" />
              <Text className="text-xs text-white font-bold uppercase">
                {vote_average ? vote_average.toFixed(1) : "-"}
              </Text>
            </View>
            <Text className="text-xs text-light-200 font-medium mt-1">
              {release_date ? release_date.split("-")[0] : ""}
            </Text>
          </View>
        </Pressable>
      </Link>
    </>
  );
}

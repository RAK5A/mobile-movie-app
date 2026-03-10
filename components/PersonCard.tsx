import { Link } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";

interface PersonCardProps {
  id: number;
  name: string;
  profile_path: string | null;
  known_for_department?: string;
  containerClassName?: string;
}

export default function PersonCard({
  id,
  name,
  profile_path,
  known_for_department,
  containerClassName,
}: PersonCardProps) {
  return (
    <Link href={`/people/${id}`} asChild>
      <Pressable className={`flex-1 min-w-[100px] ${containerClassName ?? ""}`}>
        <View className="bg-dark-100 rounded-2xl overflow-hidden border border-white/10">
          <Image
            source={{
              uri: profile_path
                ? `https://image.tmdb.org/t/p/w185${profile_path}`
                : `https://placehold.co/185x278/1a1a1a/ffffff.png?text=${encodeURIComponent(name)}`,
            }}
            className="w-full aspect-[2/3]"
            resizeMode="cover"
          />
          <View className="p-2">
            <Text className="font-bold text-xs text-white" numberOfLines={1}>
              {name}
            </Text>
            {known_for_department && (
              <Text className="text-[10px] text-light-200 mt-0.5" numberOfLines={1}>
                {known_for_department}
              </Text>
            )}
          </View>
        </View>
      </Pressable>
    </Link>
  );
}

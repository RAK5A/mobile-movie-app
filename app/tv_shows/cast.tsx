// import {
//   View,
//   Text,
//   TouchableOpacity,
//   Image,
//   ActivityIndicator,
//   FlatList,
// } from "react-native";
// import React from "react";
// import { router, useLocalSearchParams } from "expo-router";
// import useFetch from "@/services/usefetch";
// import { fetchAllTVShowCast } from "@/services/api";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { icons } from "@/constants/icons";

// export default function TVShowCast() {
//   const { id, name } = useLocalSearchParams();
//   const {
//     data: cast,
//     loading,
//     error: castError,
//   } = useFetch(() => fetchAllTVShowCast(id as string));

//   return (
//     <SafeAreaView className="bg-primary">
//       <View className="flex-row items-center px-5 py-4 gap-x-3">
//         <TouchableOpacity>
//           <Image
//             source={icons.arrow}
//             className="size-5 rotate-180"
//             tintColor="#fff"
//           />
//         </TouchableOpacity>
//         <View>
//           <Text className="text-white font-bold text-xl">Full Cast</Text>
//           <Text className="text-light-200 text-xl">{name}</Text>
//         </View>

//         {loading ? (
//           <ActivityIndicator size="large" color="#ab8bff" className="mt-10" />
//         ) : (
//           <FlatList
//             data={cast}
//             keyExtractor={(item) => item.id.toString()}
//             numColumns={3}
//             columnWrapperStyle={{
//               justifyContent: "flex-start",
//               gap: 20,
//               marginBottom: 20,
//             }}
//             contentContainerStyle={{
//               paddingHorizontal: 20,
//               paddingBottom: 40,
//             }}
//             renderItem={({ item }) => (
//               <TouchableOpacity
//                 className="w-[30%] items-center"
//                 onPress={() => router.push(`/people/${item.id}`)}
//               >
//                 <Image
//                   source={{
//                     uri: item.profile_path
//                       ? `https://image.tmdb.org/t/p/w185${item.profile_path}`
//                       : `https://placehold.co/100x150/1a1a1a/ffffff.png`,
//                   }}
//                   className="w-full h-52 rounded-xl"
//                   resizeMode="cover"
//                 />
//                 <Text className="text-white text-xs font-bold text-center mt-2 w-full">
//                   {item.name}
//                 </Text>
//                 <Text
//                   className="text-light-200 text-xs text-center w-full"
//                   numberOfLines={1}
//                 >
//                   {item.character}
//                 </Text>
//               </TouchableOpacity>
//             )}
//             ListEmptyComponent={
//               !loading && !castError ? (
//                 <Text className="text-center text-gray-400 mt-5">
//                   No casts found
//                 </Text>
//               ) : null
//             }
//           />
//         )}
//       </View>
//     </SafeAreaView>
//   );
// }

import { icons } from "@/constants/icons";
import { fetchAllTVShowCast } from "@/services/api";
import useFetch from "@/services/usefetch";
import { router, useLocalSearchParams } from "expo-router";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TVShowCast() {
  const { id, name } = useLocalSearchParams();
  const {
    data: cast,
    loading,
    error: castError,
  } = useFetch(() => fetchAllTVShowCast(id as string));
  return (
    <SafeAreaView className="bg-primary flex-1">
      {/* Header */}
      <View className="flex-row items-center px-5 py-4 gap-x-3">
        <TouchableOpacity onPress={router.back}>
          <Image
            source={icons.arrow}
            className="size-5 rotate-180"
            tintColor="#fff"
          />
        </TouchableOpacity>
        <View>
          <Text className="text-white font-bold text-xl">Full Cast</Text>
          <Text className="text-light-200 text-xs">{name}</Text>
        </View>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#ab8bff" className="mt-10" />
      ) : (
        <FlatList
          data={cast}
          keyExtractor={(item) => item.id.toString()}
          numColumns={3}
          columnWrapperStyle={{
            justifyContent: "flex-start",
            gap: 12,
            marginBottom: 20,
          }}
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              className="w-[30%] items-center"
              onPress={() => router.push(`/people/${item.id}`)}
            >
              <Image
                source={{
                  uri: item.profile_path
                    ? `https://image.tmdb.org/t/p/w185${item.profile_path}`
                    : `https://placehold.co/100x150/1a1a1a/ffffff.png`,
                }}
                className="w-full h-52 rounded-xl"
                resizeMode="cover"
              />
              <Text
                className="text-white text-xs font-bold text-center mt-2 w-full"
                numberOfLines={2}
              >
                {item.name}
              </Text>
              <Text
                className="text-light-200 text-xs text-center w-full"
                numberOfLines={1}
              >
                {item.character}
              </Text>
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            !loading && !castError ? (
              <Text className="text-center text-gray-400 mt-5">
                No casts found
              </Text>
            ) : null
          }
        />
      )}
    </SafeAreaView>
  );
}

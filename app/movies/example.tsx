// import {
//   View,
//   Text,
//   Image,
//   ActivityIndicator,
//   ScrollView,
//   TouchableOpacity,
// } from "react-native";
// import { useLocalSearchParams, useRouter } from "expo-router";
// import { SafeAreaView } from "react-native-safe-area-context";

// import { icons } from "@/constants/icons";
// import useFetch from "@/services/usefetch";
// import { fecthMovieDetails } from "@/services/api";

// interface MovieInfoProps {
//   label: string;
//   value?: string | number | null;
// }

// const MovieInfo = ({ label, value }: MovieInfoProps) => (
//   <View className="flex-col items-start justify-center mt-5">
//     <Text className="text-light-200 font-normal text-sm">{label}</Text>
//     <Text className="text-light-100 font-bold text-sm mt-2">
//       {value || "N/A"}
//     </Text>
//   </View>
// );

// const Details = () => {
//   const router = useRouter();
//   const { id } = useLocalSearchParams();

//   const { data: movie, loading } = useFetch(() =>
//     fecthMovieDetails(id as string)
//   );

//   if (loading)
//     return (
//       <SafeAreaView className="bg-primary flex-1">
//         <ActivityIndicator />
//       </SafeAreaView>
//     );

//   return (
//     <View className="bg-primary flex-1">
//       <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
//         <View>
//           <Image
//             source={{
//               uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}`,
//             }}
//             className="w-full h-[550px]"
//             resizeMode="stretch"
//           />

//           <TouchableOpacity className="absolute bottom-5 right-5 rounded-full size-14 bg-white flex items-center justify-center">
//             <Image
//               source={icons.play}
//               className="w-6 h-7 ml-1"
//               resizeMode="stretch"
//             />
//           </TouchableOpacity>
//         </View>

//         <View className="flex-col items-start justify-center mt-5 px-5">
//           <Text className="text-white font-bold text-xl">{movie?.title}</Text>
//           <View className="flex-row items-center gap-x-1 mt-2">
//             <Text className="text-light-200 text-sm">
//               {movie?.release_date?.split("-")[0]} •
//             </Text>
//             <Text className="text-light-200 text-sm">{movie?.runtime}m</Text>
//           </View>

//           <View className="flex-row items-center bg-dark-100 px-2 py-1 rounded-md gap-x-1 mt-2">
//             <Image source={icons.star} className="size-4" />

//             <Text className="text-white font-bold text-sm">
//               {Math.round(movie?.vote_average ?? 0)}/10
//             </Text>

//             <Text className="text-light-200 text-sm">
//               ({movie?.vote_count} votes)
//             </Text>
//           </View>

//           <MovieInfo label="Overview" value={movie?.overview} />
//           <MovieInfo
//             label="Genres"
//             value={movie?.genres?.map((g) => g.name).join(" • ") || "N/A"}
//           />

//           <View className="flex flex-row justify-between w-1/2">
//             <MovieInfo
//               label="Budget"
//               value={`$${(movie?.budget ?? 0) / 1_000_000} million`}
//             />
//             <MovieInfo
//               label="Revenue"
//               value={`$${Math.round(
//                 (movie?.revenue ?? 0) / 1_000_000
//               )} million`}
//             />
//           </View>

//           <MovieInfo
//             label="Production Companies"
//             value={
//               movie?.production_companies?.map((c) => c.name).join(" • ") ||
//               "N/A"
//             }
//           />
//         </View>
//       </ScrollView>

//       <TouchableOpacity
//         className="absolute bottom-5 left-0 right-0 mx-5 bg-accent rounded-lg py-3.5 flex flex-row items-center justify-center z-50"
//         onPress={router.back}
//       >
//         <Image
//           source={icons.arrow}
//           className="size-5 mr-1 mt-0.5 rotate-180"
//           tintColor="#fff"
//         />
//         <Text className="text-white font-semibold text-base">Go Back</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default Details;

import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import useFetch from "@/services/usefetch";
import { useRouter } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  Text,
  View,
} from "react-native";

export default function Index() {
  const router = useRouter();
  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
  } = useFetch(() => fetchMovies({ query: "" }));

  return (
    <View className="flex-1 bg-primary">
      <Image
        source={images.bg}
        className="absolute w-full z-0"
        resizeMode="cover"
      />

      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
      >
        <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />
        {moviesLoading ? (
          <ActivityIndicator
            size="large"
            color="#000ff"
            className="m-10 self-center"
          />
        ) : moviesError ? (
          <Text>Error: {moviesError?.message}</Text>
        ) : (
          <View className="flex-1 mt-5">
            <SearchBar
              onPress={() => router.push("/search")}
              placeholder="Search for a movie"
            />

            <>
              <Text className="text-lg text-white font-bold mt-5 mb-3">
                Latest Movie
              </Text>
              <FlatList
                data={movies}
                renderItem={({ item }) => <MovieCard {...item} />}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                columnWrapperStyle={{
                  justifyContent: "flex-start",
                  gap: 20,
                  paddingRight: 5,
                  marginBottom: 10,
                }}
                className="mt-2 pb-32"
                scrollEnabled={false}
              />
            </>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

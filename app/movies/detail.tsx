import { View, Text } from 'react-native'
import React from 'react'

export default function Detail() {
  return (
    <View>
      <Text>detail</Text>
    </View>
  )
}

/* import Trailer from "@/components/Trailer";
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
    <SafeAreaView className="bg-primary flex-1">
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
    </SafeAreaView>
  );
} */



// import Trailer from "@/components/Trailer";
// import { icons } from "@/constants/icons";
// import {
//   fecthMovieDetails,
//   fetchMovieCast,
//   fetchMovieTrailer,
// } from "@/services/api";
// import useFetch from "@/services/usefetch";
// import { router, useLocalSearchParams } from "expo-router";
// import React, { useState } from "react";
// import {
//   ActivityIndicator,
//   FlatList,
//   Image,
//   ScrollView,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { LinearGradient } from "expo-linear-gradient";

// export default function MovieDetail() {
//   const { id } = useLocalSearchParams();
//   const { data: movie, loading } = useFetch(() =>
//     fecthMovieDetails(id as string),
//   );
//   const { data: cast, loading: castLoading } = useFetch(() =>
//     fetchMovieCast(id as string),
//   );

//   const [modalVisible, setModalVisible] = useState(false);
//   const [trailerKey, setTrailerKey] = useState<string | null>(null);
//   const [loadingTrailer, setLoadingTrailer] = useState(false);

//   const handlePlayPress = async () => {
//     setLoadingTrailer(true);
//     const key = await fetchMovieTrailer(Number(id));
//     setTrailerKey(key);
//     setLoadingTrailer(false);
//     setModalVisible(true);
//   };

//   if (loading)
//     return (
//       <SafeAreaView className="bg-primary flex-1 items-center justify-center">
//         <ActivityIndicator size="large" color="#ab8bff" />
//       </SafeAreaView>
//     );

//   const ratingPercent = ((movie?.vote_average ?? 0) / 10) * 100;

//   return (
//     <SafeAreaView className="bg-primary flex-1">
//       <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
//         {/* Poster with curved bottom + play button */}
//         <View>
//           <Image
//             source={{
//               uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}`,
//             }}
//             className="w-full h-[480px]"
//             resizeMode="cover"
//           />

//           {/* Dark fade at bottom of poster */}
//           {/* <View
//             className="absolute bottom-0 left-0 right-0 h-40"
//             style={{
//               background: "transparent",
//               backgroundImage: "linear-gradient(transparent, #030014)",
//             }}
//           /> */}
//           <LinearGradient
//             colors={["transparent", "rgba(3,0,20,0.8)", "#030014"]}
//             className="absolute bottom-0 left-0 right-0 h-40"
//           />

//           {/* Back button */}
//           <TouchableOpacity
//             onPress={router.back}
//             className="absolute top-4 left-4 bg-black/50 rounded-full w-10 h-10 items-center justify-center"
//           >
//             <Image
//               source={icons.arrow}
//               className="size-5 rotate-180"
//               tintColor="#fff"
//             />
//           </TouchableOpacity>

//           {/* Curved bump with play button */}
//           <View className="absolute -bottom-7 left-0 right-0 items-center">
//             {/* Outer ring (curve effect) */}
//             <View className="w-20 h-20 rounded-full bg-primary items-center justify-center">
//               {/* Purple accent ring */}
//               <View className="w-16 h-16 rounded-full bg-accent/20 border-2 border-accent items-center justify-center">
//                 <TouchableOpacity
//                   onPress={handlePlayPress}
//                   disabled={loadingTrailer}
//                   className="w-12 h-12 rounded-full bg-accent items-center justify-center"
//                 >
//                   {loadingTrailer ? (
//                     <ActivityIndicator size="small" color="#fff" />
//                   ) : (
//                     <Image
//                       source={icons.play}
//                       className="w-5 h-5 ml-1"
//                       resizeMode="contain"
//                       tintColor="#fff"
//                     />
//                   )}
//                 </TouchableOpacity>
//               </View>
//             </View>
//           </View>
//         </View>

//         <View className="px-5 mt-12">
//           {/* Title */}
//           <Text className="text-white text-3xl font-bold text-center">
//             {movie?.title}
//           </Text>

//           {/* Tagline */}
//           {movie?.tagline ? (
//             <Text className="text-light-200 text-sm italic text-center mt-1">
//               {movie.tagline}
//             </Text>
//           ) : null}

//           {/* Year • Runtime */}
//           <View className="flex-row items-center justify-center gap-x-2 mt-2">
//             <Text className="text-light-200 text-sm">Released</Text>
//             <Text className="text-light-200">•</Text>
//             <Text className="text-light-200 text-sm">
//               {movie?.release_date?.split("-")[0]}
//             </Text>
//             <Text className="text-light-200">•</Text>
//             <Text className="text-light-200 text-sm">{movie?.runtime} min</Text>
//           </View>

//           {/* Genre tags */}
//           <View className="flex-row flex-wrap justify-center gap-2 mt-3">
//             {movie?.genres.map((genre) => (
//               <Text key={genre.id} className="text-light-200 text-sm">
//                 {genre.name} •
//               </Text>
//             ))}
//           </View>

//           {/* Overview */}
//           <Text className="text-light-200 text-sm leading-6 mt-4 text-center">
//             {movie?.overview || "N/A"}
//           </Text>

//           {/* Rating Bar */}
//           <View className="mt-6">
//             <View className="flex-row items-center justify-between mb-2">
//               <View className="flex-row items-center gap-x-1">
//                 <Image source={icons.star} className="size-4" />
//                 <Text className="text-white font-bold text-sm">
//                   {movie?.vote_average.toFixed(1)}/10
//                 </Text>
//               </View>
//               <Text className="text-light-200 text-xs">
//                 {movie?.vote_count?.toLocaleString()} votes
//               </Text>
//             </View>
//             <View className="w-full h-2 bg-dark-100 rounded-full">
//               <View
//                 className="h-2 bg-accent rounded-full"
//                 style={{ width: `${ratingPercent}%` }}
//               />
//             </View>
//           </View>

//           {/* Budget & Revenue */}
//           <View className="flex-row gap-x-10 mt-5">
//             <View>
//               <Text className="text-light-200 text-xs">Budget</Text>
//               <Text className="text-white font-bold text-sm mt-1">
//                 ${((movie?.budget ?? 0) / 1_000_000).toFixed(1)}M
//               </Text>
//             </View>
//             <View>
//               <Text className="text-light-200 text-xs">Revenue</Text>
//               <Text className="text-white font-bold text-sm mt-1">
//                 ${Math.round((movie?.revenue ?? 0) / 1_000_000)}M
//               </Text>
//             </View>
//           </View>

//           {/* Production Companies */}
//           <View className="mt-4">
//             <Text className="text-light-200 text-xs">Production</Text>
//             <Text className="text-white font-bold text-sm mt-1">
//               {movie?.production_companies.map((c) => c.name).join(" • ") ||
//                 "N/A"}
//             </Text>
//           </View>

//           {/* Cast */}
//           <View className="mt-6">
//             <Text className="text-white font-bold text-xl mb-4">Top Cast</Text>
//             {castLoading ? (
//               <ActivityIndicator color="#ab8bff" />
//             ) : (
//               <FlatList
//                 data={cast}
//                 horizontal
//                 showsHorizontalScrollIndicator={false}
//                 keyExtractor={(item) => item.id.toString()}
//                 contentContainerStyle={{ gap: 16 }}
//                 renderItem={({ item }) => (
//                   <View className="items-center w-20">
//                     <View className="w-16 h-16 rounded-full border-2 border-accent/50 overflow-hidden">
//                       <Image
//                         source={{
//                           uri: item.profile_path
//                             ? `https://image.tmdb.org/t/p/w185${item.profile_path}`
//                             : `https://placehold.co/100x100/1a1a1a/ffffff.png`,
//                         }}
//                         className="w-full h-full"
//                         resizeMode="cover"
//                       />
//                     </View>
//                     <Text
//                       className="text-white text-xs font-bold text-center mt-2"
//                       numberOfLines={2}
//                     >
//                       {item.name}
//                     </Text>
//                     <Text
//                       className="text-light-200 text-xs text-center mt-0.5"
//                       numberOfLines={1}
//                     >
//                       {item.character}
//                     </Text>
//                   </View>
//                 )}
//               />
//             )}
//           </View>
//         </View>
//       </ScrollView>

//       <Trailer
//         visible={modalVisible}
//         trailerKey={trailerKey}
//         onClose={() => setModalVisible(false)}
//       />
//     </SafeAreaView>
//   );
// }

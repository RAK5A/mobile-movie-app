// import MovieCard from "@/components/MovieCard";
// import { icons } from "@/constants/icons";
// import { images } from "@/constants/images";
// import useFetch from "@/services/usefetch";
// import { FlatList, Image, View } from "react-native";

// export default function PeopleDetail() {
//     <View className="flex-1 bg-primary">
//       <Image
//         source={images.bg}
//         className="absolute w-full z-0"
//         resizeMode="cover"
//       />

//       <FlatList
//         data={[]}
//         renderItem={({ item }) => <MovieCard {...item} />}
//         keyExtractor={(item) => item.id.toString()}
//         numColumns={3}
//         columnWrapperStyle={{
//           justifyContent: "flex-start",
//           gap: 20,
//           paddingRight: 5,
//           marginBottom: 10,
//         }}
//         className="flex-1 px-5"
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={{ minHeight: "100%", paddingBottom: 100 }}
//         ListHeaderComponent={
//           <>
//             <Image
//               source={icons.logo}
//               className="w-12 h-10 mt-20 mb-5 mx-auto"
//             />

//             <Text className="text-lg text-white font-bold mt-5 mb-3">
//               Latest Movies
//             </Text>
//             {moviesLoading && (
//               <ActivityIndicator size="large" color="#fff" className="my-3" />
//             )}
//             {moviesError && (
//               <Text className="text-red-500">Failed to load latest movies</Text>
//             )}
//           </>
//         }
//       />
//     </View>
//   );
// }

import { View, Text } from 'react-native'
import React from 'react'

export default function PeopleDetail() {
  return (
    <View>
      <Text>[id]</Text>
    </View>
  )
}
import { images } from "@/constants/images";
import React from "react";
import { Image, View } from "react-native";

export default function Search() {
  return (
    <View className="flex-1 bg-primary">
      <Image
        source={images.bg}
        className="absolute z-0 w-full"
        resizeMode="contain"
      />
    </View>
  );
}

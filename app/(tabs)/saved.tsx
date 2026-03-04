import { icons } from "@/constants/icons";
import React from "react";
import { Image, Text, View } from "react-native";

export default function Saved() {
  return (
    <View className="flex-1 bg-primary px-10">
      <View className="flex justify-center items-center flex-1 flex-col gap-5">
        <Image
          source={icons.save}
          className="size-10"
          resizeMode="cover"
          tintColor="Fff"
        />
        <Text className="text-gray-500 text-base">Save</Text>
      </View>
    </View>
  );
}

import { icons } from "@/constants/icons";
import React from "react";
import { Image, TextInput, View } from "react-native";

interface Props {
  placeholder: string;
  onPress?: () => void;
  // onChangeText: (text: string) => void;
  // onSubmitEditing: () => void;
  // value?: string;
}

export default function SearchBar({
  placeholder,
  onPress,
  // onSubmitEditing,
  // onChangeText,
  // value,
}: Props) {
  return (
    <View className="flex flex-row items-center bg-dark-200 rounded-full px-5 py-4">
      <Image
        source={icons.search}
        className="size-5"
        resizeMode="contain"
        tintColor="#ab8bff"
      />

      <TextInput
        onPress={onPress}
        onChangeText={() => {}}
        value=""
        // value={value}
        // onChangeText={onChangeText}
        // onSubmitEditing={onSubmitEditing}
        // returnKeyType="search"
        placeholder={placeholder}
        placeholderTextColor="#a8b5db"
        className="flex-1 ml-2 text-white"
      />
    </View>
  );
}

import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { Tabs } from "expo-router";
import React from "react";
import { Image, ImageBackground, Text, View } from "react-native";

const TabIcon = ({ focused, icon, title }: any) => {
  if (focused) {
    return (
      <ImageBackground
        source={images.highlight}
        className="flex flex-row flex-1 min-w-[112px] min-h-16 mt-4 justify-center items-center rounded-full overflow-hidden"
      >
        <Image source={icon} tintColor="#151312" className="size-5" />
        <Text className="text-secondary text-base font-semibold ml-2">
          {title}
        </Text>
      </ImageBackground>
    );
  }

  return (
    <View className="size-full justify-center items-center mt-4 rounded-full">
      <Image source={icon} tintColor="#A8B5DB" className="size-5" />
    </View>
  );
};

export default function _layout() {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarItemStyle: {
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        },
        tabBarStyle: {
          backgroundColor: "#0f0D23",
          borderRadius: 50,
          marginHorizontal: 20,
          marginBottom: 36,
          height: 52,
          position: "absolute",
          borderWidth: 1,
          borderColor: "#0f0d23",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          title: "Movies",
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              icon={icons.clapperboard}
              title="Movies"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="tv_show"
        options={{
          headerShown: false,
          title: "TV Shows",
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.tv} title="TV Shows" />
          ),
        }}
      />
      <Tabs.Screen
        name="people"
        options={{
          headerShown: false,
          title: "People",
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.person} title="People" />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          headerShown: false,
          title: "Search",
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.search} title="Search" />
          ),
        }}
      />
    </Tabs>
  );
}

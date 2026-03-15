import { icons } from "@/constants/icons";
import React, { useState } from "react";
import { ActivityIndicator, Image, Text, TouchableOpacity, View } from "react-native";

interface ExpandableSectionProps {
  title: string;
  count?: number;
  children: React.ReactNode;
  defaultExpanded?: boolean;
  loading?: boolean;
  error?: Error | null;  
}

export default function ExpandableSection({
  title,
  count,
  children,
  defaultExpanded = true,
  loading = false,
  error = null,
}: ExpandableSectionProps) {
  const [expanded, setExpanded] = useState(defaultExpanded);

  return (
    <View className="mb-5">
      <TouchableOpacity
        onPress={() => setExpanded((prev) => !prev)}
        className="flex-row items-center justify-between mb-3"
      >
        <View className="flex-row items-center gap-x-2">
          <Text className="text-white font-bold text-base">{title}</Text>
          {(count ?? 0) > 0 && (
            <View className="bg-accent/30 px-2 py-0.5 rounded-full">
              <Text className="text-accent text-xs font-bold">{count}</Text>
            </View>
          )}
        </View>
        <Image
          source={icons.arrow}
          className="size-4"
          tintColor="#fff"
          style={{ transform: [{ rotate: expanded ? "90deg" : "-90deg" }] }}
        />
      </TouchableOpacity>

      {expanded && (
        <>
          {loading ? (
            <ActivityIndicator size="large" color="#ab8bff" className="my-3" />
          ) : error ? (
            <Text className="text-red-500">Error: {error.message}</Text>
          ) : (
            children
          )}
        </>
      )}
    </View>
  );
}
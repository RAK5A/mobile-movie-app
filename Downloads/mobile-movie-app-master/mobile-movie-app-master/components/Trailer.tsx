import React from "react";
import {
  Modal,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";

interface TrailerProps {
  visible: boolean;
  trailerKey: string | null;
  onClose: () => void;
}

export default function Trailer({
  visible,
  trailerKey,
  onClose,
}: TrailerProps) {
  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/80 justify-center items-center px-5">
        <View
          className="w-full rounded-xl overflow-hidden bg-black"
          style={{ aspectRatio: 16 / 9 }}
        >
          {/* Close Button */}
          <TouchableOpacity
            onPress={onClose}
            className="absolute top-2 right-2 z-10 bg-black/60 px-3 py-1 rounded-lg"
          >
            <Text className="text-white text-xs font-bold">✕ Close</Text>
          </TouchableOpacity>

          {trailerKey ? (
            <YoutubePlayer
              height={220}
              play={visible} // auto-plays when modal opens
              videoId={trailerKey}
              onError={() => onClose()}
            />
          ) : (
            <View className="flex-1 justify-center items-center">
              <Text className="text-gray-400 text-base">
                No trailer available
              </Text>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
}

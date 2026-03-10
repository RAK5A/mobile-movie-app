import { Stack } from "expo-router";
import "../global.css";

export default function RootLayout() {
  return (
    <Stack>
      {/* Team's existing screens — do not edit */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="movies/[id]" options={{ headerShown: false }} />

      {/* NEW — People detail screen */}
      <Stack.Screen name="people/[id]" options={{ headerShown: false }} />
    </Stack>
  );
}

import { Stack } from "expo-router";
// import "../global.css";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="movies/[id]" options={{ headerShown: false }} />
      <Stack.Screen name="movies/see-all" options={{ headerShown: false }} />
      <Stack.Screen name="tv/[id]" options={{ headerShown: false }} />
      <Stack.Screen name="people/[id]" options={{ headerShown: false }} />
    </Stack>
  );
}

import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="movies/[id]" options={{ headerShown: false }} />
      <Stack.Screen name="movies/see_all" options={{ headerShown: false }} />
      <Stack.Screen name="movies/cast" options={{ headerShown: false }} />
      <Stack.Screen name="tv_shows/[id]" options={{ headerShown: false }} />
      <Stack.Screen name="tv_shows/see_all" options={{ headerShown: false }} />
      <Stack.Screen name="tv_shows/cast" options={{ headerShown: false }} />
      <Stack.Screen name='people/[id]' options={{headerShown: false}}/>
    </Stack>
  );
}

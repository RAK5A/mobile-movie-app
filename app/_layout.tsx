import { Stack } from "expo-router";
// import "../global.css";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="movies/[id]" options={{ headerShown: false }} />
      <Stack.Screen name="movies/see_all" options={{ headerShown: false }} />
      <Stack.Screen name='people/[id]' options={{headerShown: false}}/>
      <Stack.Screen name='tv_show/[id]' options={{headerShown: false}}/>
    </Stack>
  );
}

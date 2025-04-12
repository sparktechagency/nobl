import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="home" />
      <Stack.Screen name="auth" />
      <Stack.Screen name="setting" />
      <Stack.Screen name="details/video/[id]" />
      <Stack.Screen name="details/doc/[id]" />
      <Stack.Screen name="details/link/[id]" />
    </Stack>
  );
}

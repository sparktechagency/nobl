import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        statusBarStyle: "dark",
        statusBarBackgroundColor: "white",
        statusBarAnimation: "fade",
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="my_profile" />
      <Stack.Screen name="edit_profile" />
      <Stack.Screen name="terms_and_conditions" />
      <Stack.Screen name="about_us" />
    </Stack>
  );
}

import { PrimaryColor } from "@/utils/utils";
import { Stack } from "expo-router";

export const unstable_settings = {
  // Ensure any route can link back to `/`
  initialRouteName: "index",
};

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        statusBarStyle: "light",
        statusBarBackgroundColor: PrimaryColor,
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

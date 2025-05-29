import { Stack } from "expo-router";
export const unstable_settings = {
  // Ensure any route can link back to `/`
  initialRouteName: "index",
};
export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" />
      <Stack.Screen name="forget_password" />
      <Stack.Screen name="otp_verify" />
      <Stack.Screen name="new_password" />
      <Stack.Screen name="password_change_successful" />
    </Stack>
  );
}

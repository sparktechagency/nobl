import { Stack } from "expo-router";

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

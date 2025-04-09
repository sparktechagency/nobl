import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="auth/login" />
      <Stack.Screen name="auth/forget_password" />
      <Stack.Screen name="auth/otp_verify" />
      <Stack.Screen name="auth/new_password" />
      <Stack.Screen name="auth/password_change_successful" />
      <Stack.Screen name="home/photos" />
      <Stack.Screen name="home/videos" />
      <Stack.Screen name="home/documents" />
      <Stack.Screen name="home/links" />
      <Stack.Screen name="settings/my_profile" />
      <Stack.Screen name="settings/edit_profile" />
      <Stack.Screen name="settings/terms_and_conditions" />
      <Stack.Screen name="settings/about_us" />
    </Stack>
  );
}

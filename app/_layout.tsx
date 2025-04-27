import tw from "@/lib/tailwind";
import { Stack } from "expo-router";
import { SafeAreaView } from "react-native";

export default function RootLayout() {
  return (
    <SafeAreaView style={tw` flex-1 bg-primary`}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="home" />
        <Stack.Screen name="auth" />
        <Stack.Screen name="setting" />
        <Stack.Screen name="details/video/[id]" />
        <Stack.Screen name="details/doc/[id]" />
        {/* <Stack.Screen name="comm" /> */}
      </Stack>
    </SafeAreaView>
  );
}

import tw from "@/lib/tailwind";
import store from "@/redux/store";
import { Stack } from "expo-router";
import { SafeAreaView } from "react-native";
import { Provider } from "react-redux";

export default function RootLayout() {
  return (
    <SafeAreaView style={tw` flex-1 bg-primary`}>
      <Provider store={store}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="home" />
          <Stack.Screen name="auth" />
          <Stack.Screen name="setting" />
          <Stack.Screen name="details/video/[id]" />
          <Stack.Screen name="details/doc/[id]" />
          {/* <Stack.Screen name="comm" /> */}
        </Stack>
      </Provider>
    </SafeAreaView>
  );
}

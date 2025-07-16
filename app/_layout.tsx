import { Platform, SafeAreaView, View } from "react-native";

import tw from "@/lib/tailwind";
import store from "@/redux/store";
import { PrimaryColor } from "@/utils/utils";
import { Toasts } from "@backpackapp-io/react-native-toast";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { useDeviceContext } from "twrnc";

export const unstable_settings = {
  // Ensure any route can link back to `/`
  initialRouteName: "index",
};
export default function RootLayout() {
  const { bottom, top } = useSafeAreaInsets();
  useDeviceContext(tw);
  return (
    <>
      {Platform.OS === "ios" ? (
        <View
          style={[
            tw` flex-1 bg-primary text-white`,
            {
              paddingBottom: 0,
              paddingTop: top,
            },
          ]}
        >
          <GestureHandlerRootView>
            <Provider store={store}>
              <Stack
                screenOptions={{
                  headerShown: false,
                  statusBarStyle: "light",
                  statusBarBackgroundColor: PrimaryColor,
                  // animation: "simple_push",
                }}
              >
                <Stack.Screen name="index" />
                <Stack.Screen name="home" />
                <Stack.Screen name="auth" />
                <Stack.Screen name="setting" />
                <Stack.Screen name="details/video/[id]" />
                <Stack.Screen name="details/doc/[id]" />
                <Stack.Screen
                  name="video_comment_modal"
                  options={{
                    presentation: "formSheet",
                    gestureDirection: "vertical",
                    sheetAllowedDetents: "fitToContents",
                    keyboardHandlingEnabled: false,
                    sheetExpandsWhenScrolledToEdge: false,
                    animationMatchesGesture: false,
                    fullScreenGestureEnabled: false,
                    fullScreenGestureShadowEnabled: false,
                    gestureEnabled: false,
                    sheetGrabberVisible: false,
                    gestureResponseDistance: {
                      top: 10,
                    },
                  }}
                />
              </Stack>
              <Toasts
                defaultStyle={{
                  view: tw`bg-primary rounded-md`,
                }}
              />
            </Provider>
          </GestureHandlerRootView>
        </View>
      ) : (
        <SafeAreaView
          style={[
            tw` flex-1 bg-primary text-white`,
            {
              paddingBottom: bottom,
              paddingTop: top,
            },
          ]}
        >
          <GestureHandlerRootView>
            <Provider store={store}>
              <Stack
                screenOptions={{
                  headerShown: false,
                  statusBarStyle: "light",
                  statusBarBackgroundColor: PrimaryColor,
                  // animation: "simple_push",
                }}
              >
                <Stack.Screen name="index" />
                <Stack.Screen name="home" />
                <Stack.Screen name="auth" />
                <Stack.Screen name="setting" />
                <Stack.Screen name="details/video/[id]" />
                <Stack.Screen name="details/doc/[id]" />
                <Stack.Screen
                  name="video_comment_modal"
                  options={{
                    presentation: "formSheet",
                    gestureDirection: "vertical",
                    sheetAllowedDetents: "fitToContents",
                    keyboardHandlingEnabled: false,
                    sheetExpandsWhenScrolledToEdge: false,
                    animationMatchesGesture: false,
                    fullScreenGestureEnabled: false,
                    fullScreenGestureShadowEnabled: false,
                    gestureEnabled: false,
                    sheetGrabberVisible: false,
                    gestureResponseDistance: {
                      top: 10,
                    },
                  }}
                />
              </Stack>
              <Toasts
                defaultStyle={{
                  view: tw`bg-primary rounded-md`,
                }}
              />
            </Provider>
          </GestureHandlerRootView>
        </SafeAreaView>
      )}
    </>
  );
}

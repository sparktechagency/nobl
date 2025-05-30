import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import { ActivityIndicator, Image, View } from "react-native";
import React, { useEffect } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { PrimaryColor } from "@/utils/utils";
import tw from "@/lib/tailwind";
import { useGetTokenCheckQuery } from "@/redux/apiSlices/authApiSlices";
import { useRouter } from "expo-router";

SplashScreen.preventAutoHideAsync(); // Prevent Expo's splash screen from auto-hiding

export default function App() {
  const route = useRouter();

  useEffect(() => {
    Font.loadAsync({
      PoppinsBlack: require("../assets/fonts/Poppins/PoppinsBlack.ttf"),
      PoppinsBlackItalic: require("../assets/fonts/Poppins/PoppinsBlackItalic.ttf"),
      PoppinsBold: require("../assets/fonts/Poppins/PoppinsBold.ttf"),
      PoppinsBoldItalic: require("../assets/fonts/Poppins/PoppinsBoldItalic.ttf"),
      PoppinsExtraBold: require("../assets/fonts/Poppins/PoppinsExtraBold.ttf"),
      PoppinsExtraBoldItalic: require("../assets/fonts/Poppins/PoppinsExtraBoldItalic.ttf"),
      PoppinsExtraLight: require("../assets/fonts/Poppins/PoppinsExtraLight.ttf"),
      PoppinsExtraLightItalic: require("../assets/fonts/Poppins/PoppinsExtraLightItalic.ttf"),
      PoppinsItalic: require("../assets/fonts/Poppins/PoppinsItalic.ttf"),
      PoppinsLight: require("../assets/fonts/Poppins/PoppinsLight.ttf"),
      PoppinsLightItalic: require("../assets/fonts/Poppins/PoppinsLightItalic.ttf"),
      PoppinsMedium: require("../assets/fonts/Poppins/PoppinsMedium.ttf"),
      PoppinsMediumItalic: require("../assets/fonts/Poppins/PoppinsMediumItalic.ttf"),
      PoppinsRegular: require("../assets/fonts/Poppins/PoppinsRegular.ttf"),
      PoppinsSemiBold: require("../assets/fonts/Poppins/PoppinsSemiBold.ttf"),
      PoppinsSemiBoldItalic: require("../assets/fonts/Poppins/PoppinsSemiBoldItalic.ttf"),
      PoppinsThin: require("../assets/fonts/Poppins/PoppinsThin.ttf"),
      PoppinsThinItalic: require("../assets/fonts/Poppins/PoppinsThinItalic.ttf"),
    });
    SplashScreen.hideAsync();
  }, []);

  // RTK Query Token Checker
  const { data: tokenCheck, isFetching, isLoading } = useGetTokenCheckQuery({});

  const handlePathDecision = async () => {
    if (isFetching || isLoading) return;
    const token = await AsyncStorage.getItem("token");
    if (token) {
      if (tokenCheck?.status) {
        route?.replace("/home");
      } else {
        route?.replace("/auth/login");
      }
    } else {
      route?.replace("/auth/login");
    }
  };

  React.useEffect(() => {
    handlePathDecision();
  }, [tokenCheck, isFetching, isLoading]);

  return (
    <View style={tw`flex-1 justify-center items-center bg-white pb-[10%]`}>
      <Image
        source={require("@/assets/images/logo.png")}
        style={tw`h-52 aspect-square `}
      />
      <ActivityIndicator
        size="large"
        color={PrimaryColor}
        style={tw`absolute bottom-16`}
      />
    </View>
  );
}

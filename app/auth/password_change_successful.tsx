import { Image, Text, View } from "react-native";

import BackWithComponent from "@/lib/backHeader/BackWithCoponent";
import { IconCheck } from "@/icons/Icon";
import React from "react";
import { SvgXml } from "react-native-svg";
import TButton from "@/lib/buttons/TButton";
import tw from "@/lib/tailwind";
import { useRouter } from "expo-router";

const password_change_successful = () => {
  const router = useRouter();
  return (
    <View style={tw`flex-1 bg-white`}>
      <BackWithComponent />
      <View style={tw`items-center gap-2 my-5`}>
        <Image
          style={tw`w-60 h-20`}
          resizeMode="cover"
          source={require("@/assets/images/logo.png")}
        />
      </View>
      <View style={tw`items-center gap-4 my-5`}>
        <SvgXml xml={IconCheck} />
        <Text
          style={tw`text-2xl text-[#00B047] w-[60%] text-center font-PoppinsSemiBold `}
        >
          Password changed successfully
        </Text>
      </View>
      <View style={tw`px-4 mt-4`}>
        <TButton
          title="Back to login"
          onPress={() => router.push("/auth/login")}
          containerStyle={tw`w-full bg-primary`}
          titleStyle={tw`text-white text-base font-PoppinsSemiBold`}
        />
      </View>
    </View>
  );
};

export default password_change_successful;

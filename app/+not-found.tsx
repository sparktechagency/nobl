import { Image, View } from "react-native";

import React from "react";
import TButton from "@/lib/buttons/TButton";
import tw from "@/lib/tailwind";
import { useRouter } from "expo-router";

const not_found = () => {
  const router = useRouter();
  return (
    <View style={tw`flex-1 justify-center items-center gap-5`}>
      <Image
        source={require("@/assets/images/notfound1.png")}
        style={tw`w-full h-44`}
      />
      {/* <Text style={tw`text-2xl font-bold`}>Page Not Found</Text> */}
      <TButton
        title="Go Back"
        onPress={() => router.back()}
        containerStyle={tw`bg-transparent border border-primary h-10 px-4 py-1 rounded-md`}
        titleStyle={tw`text-primary`}
      />
    </View>
  );
};

export default not_found;

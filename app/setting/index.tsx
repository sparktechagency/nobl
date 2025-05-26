import {
  IconAboutUs,
  IconLogout,
  IconRightArray,
  IconTermsAndConditions,
  IconUseProfile,
} from "@/icons/Icon";
import { Text, TouchableOpacity, View } from "react-native";

import BackWithComponent from "@/lib/backHeader/BackWithCoponent";
import tw from "@/lib/tailwind";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React from "react";
import { SvgXml } from "react-native-svg";

const index = () => {
  const router = useRouter();
  return (
    <View style={tw`flex-1 bg-white`}>
      <View style={tw`h-20 bg-primary`}>
        <BackWithComponent
          onPress={() => router.back()}
          title="Setting"
          togather
        />
      </View>
      <View style={tw`flex-1 p-5 mt-4 bg-white gap-4`}>
        <TouchableOpacity
          onPress={() => router.push("/setting/my_profile")}
          style={tw`flex-row items-center justify-between gap-2`}
        >
          <View style={tw`flex-row items-center gap-2`}>
            <SvgXml xml={IconUseProfile} />
            <Text style={tw`font-PoppinsSemiBold text-base`}>My Profile</Text>
          </View>
          <SvgXml xml={IconRightArray} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push("/setting/about_us")}
          style={tw`flex-row items-center justify-between gap-2`}
        >
          <View style={tw`flex-row items-center gap-2`}>
            <SvgXml xml={IconAboutUs} />
            <Text style={tw`font-PoppinsSemiBold text-base`}>About Us</Text>
          </View>
          <SvgXml xml={IconRightArray} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push("/setting/terms_and_conditions")}
          style={tw`flex-row items-center justify-between gap-2`}
        >
          <View style={tw`flex-row items-center gap-2`}>
            <SvgXml xml={IconTermsAndConditions} />
            <Text style={tw`font-PoppinsSemiBold text-base`}>
              Terms & Conditions
            </Text>
          </View>
          <SvgXml xml={IconRightArray} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={async () => {
            await AsyncStorage.removeItem("token");
            router.push("/auth/login");
          }}
          style={tw`bg-[#FFF4F3] rounded-lg flex-row items-center justify-between gap-2`}
        >
          <View style={tw`flex-row items-center gap-2`}>
            <SvgXml xml={IconLogout} />
            <Text style={tw`font-PoppinsSemiBold text-base`}>Logout</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default index;

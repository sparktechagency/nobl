import { Text, TouchableOpacity, View } from "react-native";

import { IconSettings } from "@/icons/Icon";
import IButton from "@/lib/buttons/IButton";
import tw from "@/lib/tailwind";
import Avatar from "@/lib/ui/Avatar";
import { useGetProfileQuery } from "@/redux/apiSlices/authApiSlices";
import { getGreeting } from "@/utils/utils";
import { router } from "expo-router";
import React from "react";
import { SvgXml } from "react-native-svg";

const MainHeader = () => {
  const { data: UserData } = useGetProfileQuery({});
  return (
    <View
      style={tw`flex-row justify-between items-start py-8 px-4 gap-3 bg-primary`}
    >
      <View style={tw`gap-2`}>
        <Text style={tw`text-white font-PoppinsBold text-xl`}>
          {getGreeting()},
        </Text>
        <TouchableOpacity
          onPress={() => {
            router?.push("/setting/my_profile");
          }}
          style={tw`flex-row items-center gap-2 border border-white self-start px-3 py-1 rounded-md`}
        >
          <Avatar
            size={40}
            source={{
              uri: UserData?.data?.photo,
            }}
          />

          <Text style={tw`text-white font-PoppinsMedium text-lg`}>
            {UserData?.data?.name}
          </Text>
        </TouchableOpacity>
      </View>
      <IButton
        onPress={() => {
          router.push("/setting");
        }}
        icon={<SvgXml xml={IconSettings} />}
        containerStyle={tw`self-start p-0 bg-transparent`}
      />
    </View>
  );
};

export default MainHeader;

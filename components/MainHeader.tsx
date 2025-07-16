import { Platform, Text, TouchableOpacity, View } from "react-native";

import Avatar from "@/lib/ui/Avatar";
import IButton from "@/lib/buttons/IButton";
import { IconSettings } from "@/icons/Icon";
import React from "react";
import { SvgXml } from "react-native-svg";
import { getGreeting } from "@/utils/utils";
import { router } from "expo-router";
import tw from "@/lib/tailwind";
import { useGetProfileQuery } from "@/redux/apiSlices/authApiSlices";

const MainHeader = () => {
  const { data: UserData } = useGetProfileQuery({});
  return (
    <View
      style={[
        tw`flex-row justify-between items-start px-4 gap-3 bg-primary`,
        {
          paddingTop: Platform.OS === "ios" ? 0 : 20,
          paddingBottom: 20,
        },
      ]}
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

export default React.memo(MainHeader);

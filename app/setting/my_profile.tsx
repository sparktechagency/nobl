import { ScrollView, View } from "react-native";

import { IconEdit } from "@/icons/Icon";
import BackWithComponent from "@/lib/backHeader/BackWithCoponent";
import IwtButton from "@/lib/buttons/IwtButton";
import InputText from "@/lib/inputs/InputText";
import tw from "@/lib/tailwind";
import Avatar from "@/lib/ui/Avatar";
import { useGetProfileQuery } from "@/redux/apiSlices/authApiSlices";
import { router } from "expo-router";
import React from "react";

const my_profile = () => {
  const { data: userData } = useGetProfileQuery({});

  return (
    <View style={tw`flex-1 bg-base`}>
      <View style={tw`h-20 bg-primary`}>
        <BackWithComponent
          onPress={() => router.back()}
          title="My Profile"
          togather
        />
      </View>
      <ScrollView contentContainerStyle={tw`p-4 bg-base`}>
        <View style={tw`flex-1 bg-white rounded-lg px-4 py-8 `}>
          <View style={tw`items-center self-center mt-2`}>
            <Avatar
              size={100}
              source={{
                uri: userData?.data?.photo,
              }}
            />
            {/* <IButton
              svg={IconCamera}
              onPress={() => router.push("/setting/edit_profile")}
              containerStyle={tw`absolute bottom-0 right-0 bg-transparent p-0`}
            /> */}
          </View>
          <View style={tw`mt-8 gap-4`}>
            <InputText
              editable={false}
              label="Name"
              value={userData?.data?.name}
              textInputProps={{
                placeholder: "write your name",
                style: tw`text-base font-PoppinsRegular`,
              }}
              onChangeText={() => {}}
            />
            <InputText
              editable={false}
              label="Email"
              value={userData?.data?.email}
              textInputProps={{
                placeholder: "write you email",
                style: tw`text-base font-PoppinsRegular`,
              }}
              onChangeText={() => {}}
            />
            <InputText
              editable={false}
              label="Address"
              value={userData?.data?.address}
              textInputProps={{
                placeholder: "Address",
                style: tw`text-base font-PoppinsRegular`,
              }}
              onChangeText={() => {}}
            />
            <InputText
              editable={false}
              label="Badge Number"
              value={userData?.data?.badge_number}
              textInputProps={{
                placeholder: "1234567890",
                style: tw`text-base font-PoppinsRegular`,
              }}
              onChangeText={() => {}}
            />
          </View>
        </View>
      </ScrollView>
      <View style={tw`bg-white rounded-lg px-4 py-8 `}>
        <IwtButton
          title="Edit Profile"
          onPress={() => router.push("/setting/edit_profile")}
          containerStyle={tw`bg-primary`}
          titleStyle={tw`text-white font-PoppinsRegular`}
          svg={IconEdit}
        />
      </View>
    </View>
  );
};

export default my_profile;

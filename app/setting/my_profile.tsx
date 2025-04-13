import { IconCamera, IconEdit } from "@/icons/Icon";
import { ScrollView, View } from "react-native";

import { Avatar } from "react-native-ui-lib/src/components/avatar";
import BackWithComponent from "@/lib/backHeader/BackWithCoponent";
import IButton from "@/lib/buttons/IButton";
import InputText from "@/lib/inputs/InputText";
import IwtButton from "@/lib/buttons/IwtButton";
import React from "react";
import { router } from "expo-router";
import tw from "@/lib/tailwind";

const my_profile = () => {
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
                uri: "https://s3-alpha-sig.figma.com/img/f7df/8f32/21b80e6a901c2ea98091efd1bf19e5b6?Expires=1745193600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=Ja5XFw-PFD4oWWunxKSVNtEZi6HEgeV9Vpq4yN9bG12ZhTFqM6XoMkcC7bQXuuxSKDBhuXS25~friMNl4xEWDFap5t1IUHmSy2jaIgg84an0xzW5d8u9yi2RM~a0wmQLpv3QWE4C8MdwwjIDpC5kBz0FGxitD-6LBhdKvPKS9cwqvA4ZfGebQw-vxMp3S601v8mZfcieCR2x18-Hx~DDtcxdz5p6qCsxUE2jqOdHv0Qgkn3zzk1Nel3HPETslLZA2NBAU6hc2V0S-cT4K7TLPSAJI~BdMuCbxDZGHdOCcIy1q5LQLfvR-2-1F5zPpPQdEqZ-r4kyFBQKJFkN5C~KdQ__",
              }}
            />
            <IButton
              svg={IconCamera}
              onPress={() => router.push("/setting/edit_profile")}
              containerStyle={tw`absolute bottom-0 right-0 bg-transparent p-0`}
            />
          </View>
          <View style={tw`mt-8 gap-4`}>
            <InputText
              editable={false}
              label="Name"
              textInputProps={{
                placeholder: "Arif Biswas",
                style: tw`text-base font-PoppinsRegular`,
              }}
              onChangeText={() => {}}
            />
            <InputText
              editable={false}
              label="Email"
              textInputProps={{
                placeholder: "arif@gmail.com",
                style: tw`text-base font-PoppinsRegular`,
              }}
              onChangeText={() => {}}
            />
            <InputText
              editable={false}
              label="Address"
              textInputProps={{
                placeholder: "Dhaka, Bangladesh",
                style: tw`text-base font-PoppinsRegular`,
              }}
              onChangeText={() => {}}
            />
            <InputText
              editable={false}
              label="Badge Number"
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

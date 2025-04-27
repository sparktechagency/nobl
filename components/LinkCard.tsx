import { IconEarthLink, IconOuterArray } from "@/icons/Icon";
import { Linking, Text, TouchableOpacity, View } from "react-native";

import IButton from "@/lib/buttons/IButton";
import tw from "@/lib/tailwind";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React from "react";
import { SvgXml } from "react-native-svg";

const LinkCard = ({
  link,
}: {
  link: {
    id: number;
    title: string;
    url: string;
    image: string;
  };
}) => {
  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={() => {
        Linking.openURL(link?.url);
      }}
      style={tw` rounded-lg bg-deepBlue50 shadow p-2 border border-gray-200`}
    >
      <Image
        source={{ uri: link.image }}
        style={tw`w-full h-44   rounded-t-lg`}
        contentFit="fill"
      />
      <View
        style={tw` flex-row justify-between items-center mt-3 px-4 py-2 gap-2`}
      >
        <Text
          numberOfLines={2}
          style={tw`font-PoppinsSemiBold text-base flex-1`}
        >
          {link?.url}
        </Text>

        <IButton
          onPress={() => {
            router.push(`/details/doc/${link?.id}`);
          }}
          svg={IconOuterArray}
          containerStyle={tw`bg-transparent p-0`}
        />
      </View>
      <View
        style={tw`bg-primary absolute right-4 top-4 rounded-full  justify-center items-center  h-9 w-9 `}
      >
        <SvgXml xml={IconEarthLink} />
      </View>
    </TouchableOpacity>
  );
};

export default LinkCard;

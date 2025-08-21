import { IconPlayButton, IconPlayButtonSmall } from "@/icons/Icon";
import { Text, TouchableOpacity, View } from "react-native";

import IButton from "@/lib/buttons/IButton";
import IwtButton from "@/lib/buttons/IwtButton";
import tw from "@/lib/tailwind";
import { _HIGHT } from "@/utils/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React from "react";
import { SvgXml } from "react-native-svg";

const VideoCard = ({ tutorial }: { tutorial: any }) => {
  const router = useRouter();

  // console.log(tutorial?.type);

  return (
    <TouchableOpacity
      onPress={() => {
        AsyncStorage.setItem("video", JSON.stringify(tutorial));
        router.push(`/details/video/${tutorial?.id}`);
      }}
      style={tw`bg-deepBlue50 shadow-md rounded-md `}
    >
      <View>
        <Image
          source={{
            uri: tutorial?.thumbnail,
          }}
          contentFit="cover"
          style={[
            tw`w-full   rounded-t-lg`,
            {
              height: _HIGHT * 0.2,
            },
          ]}
        />
        <Text
          numberOfLines={1}
          style={tw`bg-primary  absolute top-1 left-1 text-white text-center text-xs py-1 self-start px-2 rounded-md font-PoppinsMedium `}
        >
          {tutorial?.category?.name}
        </Text>
        <View
          style={tw`absolute bottom-0 h-full justify-center items-center left-0 right-0 bg-black/10 p-2`}
        >
          <IButton
            onPress={() => {
              AsyncStorage.setItem("video", JSON.stringify(tutorial));
              router.push(`/details/video/${tutorial?.id}`);
            }}
            svg={IconPlayButton}
            containerStyle={tw`bg-transparent rounded-full p-2`}
          />
        </View>
      </View>
      <View style={tw`flex-row  mt-3 px-4 pb-4 gap-2`}>
        <View style={tw`gap-1.5 flex-1 `}>
          {tutorial?.title && (
            <Text
              numberOfLines={1}
              style={tw`font-PoppinsSemiBold text-base flex-1`}
            >
              {tutorial?.title}
            </Text>
          )}
        </View>
        <IwtButton
          icon={<SvgXml xml={IconPlayButtonSmall} height={10} width={10} />}
          svgProps={{
            height: 15,
            width: 15,
          }}
          title={
            tutorial?.duration &&
            new Date(tutorial?.duration * 1000)
              ?.toISOString()
              ?.substr(11, 8)
              ?.slice(3, 8)
          }
          onPress={() => {
            AsyncStorage.setItem("video", JSON.stringify(tutorial));
            router.push(`/details/video/${tutorial?.id}`);
          }}
          containerStyle={tw`px-2 h-6 justify-center items-center rounded-md `}
          titleStyle={tw`text-xs`}
        />
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(VideoCard);

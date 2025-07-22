import { Text, TouchableOpacity, View } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import IButton from "@/lib/buttons/IButton";
import { IconAudio } from "@/icons/Icon";
import { Image } from "expo-image";
import IwtButton from "@/lib/buttons/IwtButton";
import React from "react";
import { SvgXml } from "react-native-svg";
import { _HIGHT } from "@/utils/utils";
import tw from "@/lib/tailwind";
import { useRouter } from "expo-router";

const AudioCard = ({ audio }: { audio: any }) => {
  const router = useRouter();

  // console.log(tutorial?.type);

  return (
    <TouchableOpacity
      onPress={() => {
        AsyncStorage.setItem("audio", JSON.stringify(audio));
        router.push(`/details/audio/${audio?.id}`);
      }}
      style={tw`bg-deepBlue50 shadow-md rounded-md `}
    >
      <View>
        <Image
          source={{
            uri: audio?.thumbnail,
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
          style={tw`bg-primary absolute top-1 left-1 text-white text-center text-xs py-1 self-start px-2 rounded-md font-PoppinsMedium `}
        >
          {audio?.category?.name}
        </Text>
        <View
          style={tw`absolute bottom-0 h-full justify-center items-center left-0 right-0 bg-black/10 p-2`}
        >
          <IButton
            onPress={() => {
              AsyncStorage.setItem("audio", JSON.stringify(audio));
              router.push(`/details/audio/${audio?.id}`);
            }}
            svg={IconAudio}
            svgProps={{
              height: 30,
              width: 30,
            }}
            containerStyle={tw`bg-transparent rounded-full p-2 h-14 w-14 bg-white bg-opacity-15`}
          />
        </View>
      </View>
      <View
        style={tw`flex-row justify-between items-center mt-3 px-4 pb-4 gap-2`}
      >
        <View style={tw`gap-1.5 flex-1`}>
          {audio?.title && (
            <Text
              numberOfLines={1}
              style={tw`font-PoppinsSemiBold text-base flex-1`}
            >
              {audio?.title}
            </Text>
          )}
        </View>
        <IwtButton
          icon={<SvgXml xml={IconAudio} width={10} height={10} />}
          svgProps={{
            height: 15,
            width: 15,
          }}
          title={
            audio?.duration &&
            new Date(audio?.duration * 1000)
              ?.toISOString()
              ?.substr(11, 8)
              ?.slice(3, 8)
          }
          onPress={() => {
            AsyncStorage.setItem("audio", JSON.stringify(audio));
            router.push(`/details/audio/${audio?.id}`);
          }}
          containerStyle={tw`px-2 h-6 justify-center items-center rounded-md `}
          titleStyle={tw`text-xs`}
        />
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(AudioCard);

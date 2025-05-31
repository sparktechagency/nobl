import { IconAudio, IconPlayButton } from "@/icons/Icon";
import {  Text, View } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import IButton from "@/lib/buttons/IButton";
import IwtButton from "@/lib/buttons/IwtButton";
import React from "react";
import { _HIGHT } from "@/utils/utils";
import tw from "@/lib/tailwind";
import { useRouter } from "expo-router";
import { Image } from "expo-image";

const AudioCard = ({ audio }: { audio: any }) => {
  const router = useRouter();

  // console.log(tutorial?.type);

  return (
    <View style={tw`bg-deepBlue50 shadow-md rounded-md `}>
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
        <View
          style={tw`absolute bottom-0 h-full justify-center items-center left-0 right-0 bg-black/10 p-2`}
        >
          <IButton
            onPress={() => {
              AsyncStorage.setItem("audio", JSON.stringify(audio));
              router.push(`/details/audio/${audio?.id}`);
            }}
            svg={IconPlayButton}
            containerStyle={tw`bg-transparent rounded-full p-2`}
          />
        </View>
      </View>
      <View
        style={tw`flex-row justify-between items-center mt-3 px-4 pb-4 gap-2`}
      >
        <View style={tw`gap-1.5 flex-1`}>
          {audio?.title && (
            <Text style={tw`font-PoppinsSemiBold text-base flex-1`}>
              {audio?.title}
            </Text>
          )}

          <Text
            style={tw`bg-primary text-white text-center text-xs py-1 self-start px-2 rounded-md font-PoppinsMedium `}
          >
            {audio?.category?.name}
          </Text>
        </View>
        <IwtButton
          svg={IconAudio}
          svgProps={{
            height: 20,
            width: 20,
          }}
          title={
            audio?.duration &&
            new Date(audio?.duration * 1000)?.toISOString()?.substr(11, 8)
          }
          onPress={() => router.push(`/details/video/${audio?.id}`)}
          containerStyle={tw`px-2 h-10 justify-center items-center rounded-md `}
        />
      </View>
    </View>
  );
};

export default AudioCard;

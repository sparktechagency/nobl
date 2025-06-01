import { ActivityIndicator, Text, View } from "react-native";
import {
  IconPlayerBackButton,
  IconPlayerForwardButton,
  IconPlayerPlayButton,
  IconPlayerPuseButton,
} from "@/icons/Icon";
import { useAudioPlayer, useAudioPlayerStatus } from "expo-audio";

import IwtButton from "@/lib/buttons/IwtButton";
import { PrimaryColor } from "@/utils/utils";
import React from "react";
import { Slider } from "react-native-awesome-slider";
import tw from "@/lib/tailwind";
import { useSharedValue } from "react-native-reanimated";

const AudioPlayerCard = ({ data }: any) => {
  const [currentTime, setCurrentTime] = React.useState(0);
  const [fullDuration, setFullDuration] = React.useState(0);
  const player = useAudioPlayer(data?.audio);
  const status = useAudioPlayerStatus(player);
  const progress = useSharedValue(0);
  const min = useSharedValue(0);
  const max = useSharedValue(0);
  React.useEffect(() => {
    const setupPlayer = async () => {
      try {
        // Just play the audio directly - it will handle loading
        max.value = data.duration;
        setFullDuration(data.duration);
        player.play();

        // Setup listeners
        player.setAudioSamplingEnabled(true);
        player.addListener("playbackStatusUpdate", (status) => {
          setCurrentTime(status.currentTime);
          progress.value = status.currentTime;
        });
        player.addListener("audioSampleUpdate", (audio) => {
          console.log(audio);
        });
      } catch (error) {
        console.error("Player initialization error:", error);
      }
    };
    if (data?.audio) {
      setupPlayer();
    }

    return () => {
      player.removeAllListeners("playbackStatusUpdate");
    };
  }, [data?.audio, player.isLoaded]);
  return (
    <View style={tw`m-4 p-6 bg-primary rounded-lg `}>
      <View style={tw`flex-row justify-between items-center mt-2`}>
        <Text style={tw`text-xs text-gray-100`}>
          {currentTime
            ? new Date(currentTime * 1000)?.toISOString()?.substr(11, 8)
            : "00:00:00"}
        </Text>
        <Text style={tw`text-xs text-gray-100`}>
          {fullDuration &&
            new Date(fullDuration * 1000)?.toISOString()?.substr(11, 8)}
        </Text>
      </View>
      {player?.currentStatus.playbackState == "idle" ? (
        <ActivityIndicator
          size="large"
          color={PrimaryColor}
          style={tw`mt-10`}
        />
      ) : (
        <>
          <Slider
            onValueChange={(value) => {
              console.log(value);
              player.seekTo(value);
            }}
            onSlidingComplete={(value) => {
              player.seekTo(value);
            }}
            bubbleContainerStyle={tw`h-4 w-4 hidden bg-white`}
            style={tw`bg-green-500 my-5 text-white`}
            renderThumb={() => null}
            // thumbScaleValue={}
            renderTrack={() => null}
            thumbWidth={0}
            markStyle={tw`bg-gray-600 h-4 text-white`}
            bubbleTextStyle={tw`text-white bg-red-600`}
            containerStyle={tw`bg-gray-100 h-3 rounded-full border border-white`}
            progress={progress}
            minimumValue={min}
            maximumValue={max}
            theme={{
              minimumTrackTintColor: PrimaryColor,
              cacheTrackTintColor: "#333",
            }}
          />
        </>
      )}
      {/* play puse button and 5ms back and forward buttons  */}
      <View style={tw`flex-row mx-10 justify-between items-center `}>
        <IwtButton
          svg={IconPlayerBackButton}
          containerStyle={tw`bg-transparent p-2 rounded-full`}
          onPress={() => {
            player.seekTo(currentTime - 5);
          }}
        />
        <IwtButton
          svg={player.playing ? IconPlayerPuseButton : IconPlayerPlayButton}
          containerStyle={tw`bg-transparent p-2 rounded-full`}
          onPress={async () => {
            try {
              if (player.playing) {
                player.pause();
              } else if (player.currentStatus.didJustFinish) {
                player.seekTo(1);
              } else {
                player.play();
              }
            } catch (error) {
              console.warn("Error toggling playback:", error);
            }
          }}
        />
        <IwtButton
          svg={IconPlayerForwardButton}
          containerStyle={tw`bg-transparent p-2 rounded-full`}
          onPress={() => {
            player.seekTo(currentTime + 5);
          }}
        />
      </View>
    </View>
  );
};

export default React.memo(AudioPlayerCard);

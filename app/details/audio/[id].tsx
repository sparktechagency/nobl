import {
  ActivityIndicator,
  Platform,
  ScrollView,
  Text,
  View,
} from "react-native";
import {
  IconDownload,
  IconPlayerBackButton,
  IconPlayerForwardButton,
  IconPlayerPlayButton,
  IconPlayerPuseButton,
} from "@/icons/Icon";
import { PrimaryColor, _HIGHT } from "@/utils/utils";
import { router, useLocalSearchParams } from "expo-router";
import { useAudioPlayer, useAudioPlayerStatus } from "expo-audio";

import AsyncStorage from "@react-native-async-storage/async-storage";
import AudioCard from "@/components/AudioCard";
import BackWithComponent from "@/lib/backHeader/BackWithCoponent";
import EmptyCard from "@/lib/Empty/EmptyCard";
import IwtButton from "@/lib/buttons/IwtButton";
import RNFetchBlob from "react-native-blob-util";
import React from "react";
import { Slider } from "react-native-awesome-slider";
import tw from "@/lib/tailwind";
import { useRelatedAudiosQuery } from "@/redux/apiSlices/user/userApiSlices";
import { useSharedValue } from "react-native-reanimated";

const VideoDetails = () => {
  const { id } = useLocalSearchParams();
  const [data, setData] = React.useState<any>(null);
  const [currentTime, setCurrentTime] = React.useState(0);
  const [fullDuration, setFullDuration] = React.useState(0);

  const {
    data: relativeAudios,
    isLoading: relativeAudioLoading,
    isFetching: relativeAudioFetching,
  } = useRelatedAudiosQuery(
    {
      params: {
        video_id: id,
        category_id: data?.category_id, // Assuming data has category_id
      },
    },
    {
      skip: !id && !data?.category_id, // Skip the query if id is not available
    }
  );

  // console.log(relativeAudio, "Related Audio");

  const player = useAudioPlayer(data?.audio);
  const status = useAudioPlayerStatus(player);
  // console.log("rendering video details", Comments);
  // Add this useEffect to handle playback status changes
  // Get the correct file URL based on type
  const handleLoadData = async () => {
    const getNewData = await AsyncStorage.getItem("audio");
    try {
      const finalData = JSON.parse(getNewData as any);
      // console.log(finalData);
      if (finalData) {
        // console.log(newDocument);
        setFullDuration(finalData.duration);
        max.value = finalData.duration;
        setData(finalData);
      }
    } catch (error) {
      // console.log(error);
    }
  };

  React.useEffect(() => {
    handleLoadData();
  }, [id]);

  // console.log(data);

  const progress = useSharedValue(0);
  const min = useSharedValue(0);
  const max = useSharedValue(0);

  const [loading, setLoading] = React.useState(false);
  // console.log(player.currentStatus.playbackState, "Playback State");
  const handleDownload = async () => {
    setLoading(true);
    try {
      const res = await RNFetchBlob.config({
        fileCache: true,
        appendExt: "mp3",
        addAndroidDownloads: {
          useDownloadManager: true,
          storeLocal: true,
          storeInDownloads: true,
          mediaScannable: true,
          notification: true,
          title: `${data?.title}.mp3`,
          description: "File downloaded by download manager.",
          path: `${RNFetchBlob.fs.dirs.DownloadDir}/${data?.title}.mp3`,
        },
      }).fetch("GET", data?.audio);

      if (Platform.OS === "ios") {
        RNFetchBlob.ios.previewDocument(res.path());
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    const setupPlayer = async () => {
      try {
        // Just play the audio directly - it will handle loading
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

  // console.log(status, "Player Duration");

  return (
    <View key={id as string} style={tw`flex-1 bg-white`}>
      {/* Header Parts  */}
      <View
        style={tw`flex-row py-3 justify-between items-center bg-primary pr-4`}
      >
        <BackWithComponent onPress={() => router.back()} />
        <IwtButton
          title="Download"
          isLoading={loading}
          loadingColor={PrimaryColor}
          svg={IconDownload}
          // disabled={status === "loading"}
          containerStyle={tw`bg-white p-1 h-9 px-3 rounded-md`}
          titleStyle={tw`text-primary font-PoppinsRegular`}
          onPress={() => {
            handleDownload();
            console.log("Download");
          }}
        />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw`bg-base `}
      >
        <View style={tw`m-4 p-6 bg-primary rounded-lg `}>
          <View style={tw`flex-row justify-between items-center mt-2`}>
            <Text style={tw`text-xs text-gray-100`}>
              {new Date(currentTime * 1000)?.toISOString()?.substr(11, 8)}
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
        <View style={tw`mt-2 gap-4  mb-5`}>
          <View
            style={tw`gap-1.5 flex-1 flex-row justify-between items-center px-4 mt-2`}
          >
            <Text style={tw`font-PoppinsSemiBold text-base flex-1`}>
              {data?.title}
            </Text>
            <Text
              style={tw`bg-primary text-white text-center text-xs py-1 self-start px-2 rounded-md font-PoppinsMedium `}
            >
              {data?.category?.name || "Uncategorized"}
            </Text>
          </View>
        </View>

        <View style={tw`flex-row pt-4 pb-2 px-4 gap-3 items-center `}>
          <Text style={tw`font-PoppinsSemiBold text-lg`}>Related Audios</Text>
        </View>
        <View style={tw`bg-gray-100 py-10 rounded-t-3xl px-4`}>
          <View style={tw`border border-gray-300 rounded-lg py-4 px-2 gap-5 `}>
            {!relativeAudios?.data?.length ? (
              <EmptyCard
                isLoading={relativeAudioLoading || relativeAudioFetching}
                hight={_HIGHT * 0.34}
              />
            ) : (
              relativeAudios?.data?.map((tutorial: any) => (
                <AudioCard key={tutorial.id} audio={tutorial} />
              ))
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default VideoDetails;

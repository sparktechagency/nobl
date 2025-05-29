import {
  IconDownload,
  IconPlayerBackButton,
  IconPlayerForwardButton,
  IconPlayerPlayButton,
  IconPlayerPuseButton,
} from "@/icons/Icon";
import { PrimaryColor, _HIGHT } from "@/utils/utils";
import { router, useLocalSearchParams } from "expo-router";
import {
  ActivityIndicator,
  Platform,
  ScrollView,
  Text,
  View,
} from "react-native";

import AudioCard from "@/components/AudioCard";
import BackWithComponent from "@/lib/backHeader/BackWithCoponent";
import IwtButton from "@/lib/buttons/IwtButton";
import EmptyCard from "@/lib/Empty/EmptyCard";
import tw from "@/lib/tailwind";
import { useRelatedAudiosQuery } from "@/redux/apiSlices/user/userApiSlices";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAudioPlayer } from "expo-audio";
import React from "react";
import { Slider } from "react-native-awesome-slider";
import RNFetchBlob from "react-native-blob-util";
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
        setData(finalData);
      }
    } catch (error) {
      // console.log(error);
    }
  };

  React.useEffect(() => {
    handleLoadData();
  }, [id]);

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
          console.log(status);
          setCurrentTime(status.currentTime);
          setFullDuration(status?.duration);
          max.value = status.duration;
          progress.value = status.currentTime;
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
                  disableMinTrackTintColor: "#fff",
                  maximumTrackTintColor: "#fff",
                  minimumTrackTintColor: PrimaryColor,
                  cacheTrackTintColor: "#333",
                  bubbleBackgroundColor: "#666",
                  heartbeatColor: "#999",
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
        {/* <TouchableOpacity
          onPress={() => {
            setIsModalVisible(true);
          }}
          style={tw`mx-4 bg-gray-50 rounded-md p-4 gap-2`}
        >
          <View style={tw`flex-row items-center gap-2`}>
            <Text style={tw`font-PoppinsSemiBold text-base text-black `}>
              Comment's
            </Text>
            <Text style={tw`font-PoppinsRegular text-gray-500 text-sm`}>
              100
            </Text>
          </View>
          <View style={tw`flex-row items-center gap-2`}>
            <Avatar size={30} source={require("@/assets/images/avatar.png")} />
            <Text
              numberOfLines={2}
              style={tw`flex-1 font-PoppinsRegular text-sm text-gray-600`}
            >
              Lorem ipsum dolor sit amet consectetur. Non egestas sagittis justo
              convallis quis ut mauris.
            </Text>
          </View>
        </TouchableOpacity> */}
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

      {/* <SideModal
        visible={isModalVisible}
        setVisible={() => {
          Keyboard.dismiss();
          setIsModalVisible(false);
        }}
        containerStyle={tw`bg-base`}
        scrollable
        props={{
          renderPannableHeader: () => (
            <View
              style={tw`flex-row justify-between items-center bg-primary p-2`}
            >
              <View style={tw`mx-3`} />
              <View>
                <Text style={tw`text-white font-PoppinsRegular text-base`}>
                  Comments
                </Text>
              </View>
              <IButton
                svg={IconClose}
                onPress={() => {
                  Keyboard.dismiss();
                  setIsModalVisible(false);
                }}
                containerStyle={tw`bg-transparent self-end`}
              />
            </View>
          ),
        }}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={150}
        >
          <ScrollView
            style={tw`min-h-[20rem] max-h-[30rem] bg-base`}
            contentContainerStyle={tw`px-4 pt-2 `} // Extra padding for input
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
      
            {[...Array(10)].map((_, i) => (
              <View key={i} style={tw`flex-row gap-2 pt-2`}>
                <Avatar
                  size={45}
                  source={require("@/assets/images/avatar.png")}
                />
                <View style={tw`flex-1`}>
                  <Text style={tw`font-PoppinsRegular text-sm text-gray-600`}>
                    Lorem ipsum dolor sit amet consectetur. Non egestas sagittis
                    justo convallis quis ut mauris.
                  </Text>
                  <View
                    style={tw`flex-row items-center justify-between gap-2 px-6`}
                  >
                    <IwtButton
                      svg={IconCalendarMini}
                      title="24-04-2025"
                      titleStyle={tw`text-gray-500 font-PoppinsRegular text-sm`}
                      containerStyle={tw`bg-transparent`}
                    />
                    <IwtButton
                      svg={IconClockMini}
                      title="10:20 AM"
                      titleStyle={tw`text-gray-500 font-PoppinsRegular text-sm`}
                      containerStyle={tw`bg-transparent`}
                    />
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>

          
          <View style={tw`p-4 bg-base border-t border-gray-200`}>
            <View style={tw`flex-row items-center gap-2`}>
              <TextInput
                style={tw`flex-1 h-12 bg-gray-300 rounded-full text-black font-PoppinsMedium px-4`}
                placeholder="Write a comment"
                placeholderTextColor={tw.color(`gray-500`)}
              />
              <TButton
                title="Post"
                containerStyle={tw`h-10 p-0 w-20 rounded-md`}
              />
            </View>
          </View>
        </KeyboardAvoidingView>
      </SideModal> */}
    </View>
  );
};

export default VideoDetails;

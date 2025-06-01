import { Platform, ScrollView, Text, View } from "react-native";
import { PrimaryColor, _HIGHT } from "@/utils/utils";
import { router, useLocalSearchParams } from "expo-router";

import AsyncStorage from "@react-native-async-storage/async-storage";
import AudioCard from "@/components/AudioCard";
import AudioPlayerCard from "@/components/AudioPlayerCard";
import BackWithComponent from "@/lib/backHeader/BackWithCoponent";
import EmptyCard from "@/lib/Empty/EmptyCard";
import { IconDownload } from "@/icons/Icon";
import IwtButton from "@/lib/buttons/IwtButton";
import RNFetchBlob from "react-native-blob-util";
import React from "react";
import tw from "@/lib/tailwind";
import { useRelatedAudiosQuery } from "@/redux/apiSlices/user/userApiSlices";

const VideoDetails = () => {
  const { id } = useLocalSearchParams();
  const [data, setData] = React.useState<any>(null);

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

  // console.log(data);

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
        <AudioPlayerCard data={data} />
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

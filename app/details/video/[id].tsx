"use strict";

import {
  IconCalendarMini,
  IconClockMini,
  IconClose,
  IconDownload,
} from "@/icons/Icon";
import {
  useGetCommentsQuery,
  usePostCommentMutation,
  useRelatedVideosQuery,
} from "@/redux/apiSlices/user/userApiSlices";
import { PrimaryColor, _HIGHT } from "@/utils/utils";
import { router, useLocalSearchParams } from "expo-router";
import React, { useCallback } from "react";
import {
  FlatList,
  Platform,
  RefreshControl,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import VideoCard from "@/components/VideoCard";
import VideoPlayerCard from "@/components/VideoPlayerCard";
import EmptyCard from "@/lib/Empty/EmptyCard";
import BackWithComponent from "@/lib/backHeader/BackWithCoponent";
import IButton from "@/lib/buttons/IButton";
import IwtButton from "@/lib/buttons/IwtButton";
import TButton from "@/lib/buttons/TButton";
import BottomModal from "@/lib/modals/BottomModal";
import tw from "@/lib/tailwind";
import Avatar from "@/lib/ui/Avatar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RNFetchBlob from "react-native-blob-util";
import { SvgXml } from "react-native-svg";

const VideoDetails = () => {
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [selectedTutorial, setSelectedTutorial] = React.useState(null);
  const [comment, setComment] = React.useState("");
  const { id } = useLocalSearchParams();
  const [data, setData] = React.useState<any>(null);

  const {
    data: Comments,
    isLoading: commentLoading,
    isFetching: commentFetching,
    refetch: commentRetch,
  } = useGetCommentsQuery({
    params: {
      video_id: id,
      per_page: 500,
    },
  });

  const {
    data: relativeVideos,
    isLoading: relativeVideosLoading,
    isFetching: relativeVideosFetching,
    refetch: relativeRefetch,
  } = useRelatedVideosQuery(
    {
      params: {
        video_id: id,
        category_id: data?.category_id, // Assuming data has category_id
        per_page: 500,
      },
    },
    {
      skip: !id && !data?.category_id, // Skip the query if id is not available
    }
  );

  // console.log(relativeVideos, "Related Videos");

  const [addNewComment, addCommentResults] = usePostCommentMutation();

  const handleAddComment = async () => {
    if (!comment.trim()) return; // Prevent empty comments
    try {
      const res = await addNewComment({
        video_id: id,
        comment: comment.trim(),
      }).unwrap();
      // console.log(res, "Comment added successfully");
      setComment(""); // Clear the input after posting
      // Optionally, you can refetch comments or update the state to show the new comment
    } catch (error) {
      console.warn("Failed to add comment:", error);
    }
  };

  // console.log(data?.video);

  // console.log("rendering video details", Comments);

  // Add this useEffect to handle playback status changes
  // Get the correct file URL based on type

  const [loading, setLoading] = React.useState(false);
  // console.log(player.currentStatus.playbackState, "Playback State");
  const handleDownload = useCallback(async () => {
    setLoading(true);
    try {
      const res = await RNFetchBlob.config({
        fileCache: true,
        appendExt: "mp4",
        addAndroidDownloads: {
          useDownloadManager: true,
          storeLocal: true,
          storeInDownloads: true,
          mediaScannable: true,
          notification: true,
          title: `${data?.title}.mp4`,
          description: "File downloaded by download manager.",
          path: `${RNFetchBlob.fs.dirs.DownloadDir}/${data?.title}.mp4`,
        },
      }).fetch("GET", data?.video);

      if (Platform.OS === "ios") {
        RNFetchBlob.ios.previewDocument(res.path());
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }, [data]);

  const handleLoadData = async () => {
    const getNewData = await AsyncStorage.getItem("video");
    try {
      const finalData = JSON.parse(getNewData as any);
      setData(finalData);
    } catch (error) {
      // console.log(error);
    }
  };

  React.useEffect(() => {
    handleLoadData();
  }, []);

  return (
    <View style={tw`flex-1 bg-white`}>
      {/* Header Parts  */}
      <View
        style={tw`flex-row pt-3 justify-between items-center bg-primary pr-4`}
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
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={relativeRefetch} />
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw`bg-base `}
        style={tw`flex-1`}
      >
        {/* VIdeo Player */}

        <VideoPlayerCard key={data?.video} source={data?.video} />

        {/* Video Details */}

        <View style={tw` mt-2  h-12`}>
          <View
            style={tw`gap-1.5  flex-1 flex-row justify-between items-center px-4 mt-2`}
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

        <TouchableOpacity
          onPress={() => {
            setIsModalVisible(true);
            // router?.push(`/video_comment_modal?id=${id}`);
          }}
          style={tw`mx-4 bg-gray-50 rounded-md p-4 gap-2`}
        >
          <View style={tw`flex-row items-center gap-2`}>
            <Text style={tw`font-PoppinsSemiBold text-base text-black `}>
              Comment's
            </Text>
            <Text style={tw`font-PoppinsRegular text-gray-500 text-sm`}>
              {Comments?.data?.data?.length || 0} Comments
            </Text>
          </View>
          <View style={tw`flex-row items-center gap-2`}>
            <Avatar
              size={50}
              source={{
                uri: Comments?.data?.data[0]?.user?.photo,
              }}
            />

            <Text
              numberOfLines={2}
              style={tw`flex-1 font-PoppinsRegular text-sm text-gray-600`}
            >
              {Comments?.data?.data[0]?.comment || "No comments yet."}
            </Text>
          </View>
        </TouchableOpacity>
        <View style={tw`flex-row pt-6 pb-2 px-4 gap-3 items-center `}>
          <Text style={tw`font-PoppinsSemiBold text-lg`}>Related Videos</Text>
        </View>
        <View style={tw`bg-gray-100 py-10 rounded-t-3xl px-4`}>
          <View style={tw`border border-gray-300 rounded-lg py-4 px-2 gap-5 `}>
            {relativeVideos?.data?.map((tutorial: any) => (
              <VideoCard key={tutorial.id} tutorial={tutorial} />
            ))}
          </View>
        </View>
      </ScrollView>
      <BottomModal
        draggable
        height={_HIGHT * 0.5}
        visible={isModalVisible}
        setVisible={setIsModalVisible}
        customStyles={[tw`rounded-md `]}
        headerComponent={
          <View
            style={tw`w-full flex-row justify-between items-center bg-primary p-2`}
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
                setIsModalVisible(false);
              }}
              containerStyle={tw`bg-transparent self-end`}
            />
          </View>
        }
      >
        {/* <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={150}
        > */}

        <FlatList
          // scrollEnabled={false}
          refreshControl={
            <RefreshControl
              refreshing={false}
              onRefresh={commentRetch}
              colors={[PrimaryColor]}
            />
          }
          ListEmptyComponent={() => (
            <EmptyCard
              isLoading={commentLoading || commentFetching}
              hight={_HIGHT * 0.4}
            />
          )}
          style={tw`min-h-[20rem] max-h-[24rem] bg-base`}
          contentContainerStyle={tw`px-4 pt-2 pb-4 gap-2`} // Extra padding for input
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          data={Comments?.data?.data}
          renderItem={({ index, item }) => {
            // console.log(item);
            return (
              <View style={tw`flex-row gap-2 pt-2`}>
                <Avatar
                  size={40}
                  source={{
                    uri: Comments?.data?.data[0]?.user?.photo,
                  }}
                />
                <View style={tw`flex-1`}>
                  <Text style={tw`font-PoppinsRegular text-sm text-gray-600`}>
                    {item?.comment}
                  </Text>
                  <View
                    style={tw`flex-row items-center justify-between gap-2 pt-2 px-6`}
                  >
                    <View style={tw`flex-row items-center gap-2`}>
                      <SvgXml xml={IconCalendarMini} />
                      <Text
                        style={tw`text-gray-500 font-PoppinsRegular text-sm`}
                      >
                        {item?.created_at
                          ? new Date(item?.created_at).toLocaleDateString(
                              "en-US",
                              {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                              }
                            )
                          : "N/A"}
                      </Text>
                    </View>
                    <View style={tw`flex-row items-center gap-2`}>
                      <SvgXml xml={IconClockMini} />
                      <Text
                        style={tw`text-gray-500 font-PoppinsRegular text-sm`}
                      >
                        {item?.created_at
                          ? new Date(item?.created_at).toLocaleTimeString(
                              "en-US",
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )
                          : "N/A"}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            );
          }}
        />

        {/* Fixed input container at bottom */}
        <View style={[tw`p-4  bg-base border-t border-gray-200`]}>
          <View style={tw`flex-row items-center  gap-2`}>
            <TextInput
              style={tw`flex-1 h-12 bg-gray-300 rounded-full text-black font-PoppinsMedium px-4`}
              placeholder="Write a comment"
              value={comment}
              onChangeText={setComment}
              returnKeyType="send"
              placeholderTextColor={tw.color(`gray-500`)}
            />
            <TButton
              disabled={comment.trim() === ""}
              onPress={handleAddComment}
              isLoading={addCommentResults.isLoading}
              title="Post"
              containerStyle={tw`h-10 p-0 w-20 rounded-md`}
            />
          </View>
        </View>
        {/* </KeyboardAvoidingView> */}
      </BottomModal>
    </View>
  );
};

export default VideoDetails;

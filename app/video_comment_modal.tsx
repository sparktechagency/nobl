import { IconCalendarMini, IconClockMini, IconClose } from "@/icons/Icon";
import {
  useGetCommentsQuery,
  usePostCommentMutation,
} from "@/redux/apiSlices/user/userApiSlices";
import { router, useLocalSearchParams } from "expo-router";
import {
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  View,
} from "react-native";

import EmptyCard from "@/lib/Empty/EmptyCard";
import IButton from "@/lib/buttons/IButton";
import IwtButton from "@/lib/buttons/IwtButton";
import TButton from "@/lib/buttons/TButton";
import tw from "@/lib/tailwind";
import { _HIGHT } from "@/utils/utils";
import { Image } from "expo-image";
import React from "react";

const video_comment_modal = () => {
  const { id } = useLocalSearchParams();
  const [data, setData] = React.useState<any>(null);
  const [comment, setComment] = React.useState("");
  const {
    data: Comments,
    isLoading,
    isFetching,
  } = useGetCommentsQuery({
    params: {
      video_id: id,
    },
  });

  const [addNewComment, addCommentResults] = usePostCommentMutation();

  const handleAddComment = async () => {
    if (!comment.trim()) return; // Prevent empty comments

    try {
      await addNewComment({
        video_id: id,
        comment: comment.trim(),
      }).unwrap();
      setComment(""); // Clear the input after posting
      // Optionally, you can refetch comments or update the state to show the new comment
    } catch (error) {
      console.error("Failed to add comment:", error);
    }
  };

  return (
    <KeyboardAvoidingView
      //   style={tw`flex-1 bg-base`}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      //   enabled
      //   keyboardVerticalOffset={100} // Adjust this value based on your header height
      contentContainerStyle={tw`flex-1`}
    >
      <View style={tw`flex-row justify-between items-center bg-primary p-2`}>
        <View style={tw`mx-3`} />
        <View>
          <Text style={tw`text-white font-PoppinsRegular text-base`}>
            Comments
          </Text>
        </View>
        <IButton
          svg={IconClose}
          onPress={() => {
            router.dismiss();
            Keyboard.dismiss();
          }}
          containerStyle={tw`bg-transparent self-end`}
        />
      </View>
      <FlatList
        tabIndex={0}
        ListEmptyComponent={() => (
          <EmptyCard isLoading={isFetching || isLoading} hight={_HIGHT * 0.4} />
        )}
        style={tw`min-h-[20rem] max-h-[30rem] bg-base`}
        contentContainerStyle={tw`px-4 pt-2 `} // Extra padding for input
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        data={[5, 6, 7, 8, 9]} // Replace with Comments?.data or similar
        renderItem={({ index, item }) => {
          // console.log(item);
          return (
            <View style={tw`flex-row gap-2 pt-2`}>
              <View style={tw`h-12 w-12 rounded-full`}>
                <Image source={require("@/assets/images/avatar.png")} />
              </View>
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
          );
        }}
      />

      {/* Fixed input container at bottom */}
      <View style={tw`p-4 bg-base border-t border-gray-200`}>
        <View style={tw`flex-row items-center gap-2`}>
          <TextInput
            style={tw`flex-1 h-12 bg-gray-300 rounded-full text-black font-PoppinsMedium px-4`}
            placeholder="Write a comment"
            placeholderTextColor={tw.color(`gray-500`)}
          />
          <TButton
            onPress={handleAddComment}
            isLoading={addCommentResults.isLoading}
            title="Post"
            containerStyle={tw`h-10 p-0 w-20 rounded-md`}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default video_comment_modal;

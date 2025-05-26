import { IconDownload, IconNoVideo } from "@/icons/Icon";
import { useLocalSearchParams, useRouter } from "expo-router";
import { VideoView, useVideoPlayer } from "expo-video";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";

import tutorialData from "@/assets/data/tutorials.json";
import VideoCard from "@/components/VideoCard";
import BackWithComponent from "@/lib/backHeader/BackWithCoponent";
import IwtButton from "@/lib/buttons/IwtButton";
import tw from "@/lib/tailwind";
import { useEvent } from "expo";
import React from "react";
import { SvgXml } from "react-native-svg";

const VideoDetails = () => {
  const router = useRouter();
  const [tutorials, setTutorials] = React.useState(tutorialData.tutorials);
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [selectedTutorial, setSelectedTutorial] = React.useState(null);
  const [comment, setComment] = React.useState("");

  const { id } = useLocalSearchParams();

  const videoSource = selectedTutorial?.video;

  const player = useVideoPlayer(videoSource, (player) => {
    console.log("player", player);
    player.play();
  });

  React.useEffect(() => {
    const tutorial = tutorials.find((tutorial) => tutorial.id === Number(id));

    if (tutorial) {
      setSelectedTutorial(tutorial as any);
    }
    return () => {};
  }, [id]);

  const keyId = Array.isArray(id) ? id.join("-") : id;

  const { status, error } = useEvent(player, "statusChange", {
    status: player.status,
  });

  return (
    <View key={keyId} style={tw`flex-1 bg-white`}>
      {/* Header Parts  */}
      <View
        style={tw`flex-row py-3 justify-between items-center bg-primary pr-4`}
      >
        <BackWithComponent onPress={() => router.back()} />
        <IwtButton
          title="Download"
          svg={IconDownload}
          disabled={status === "loading"}
          containerStyle={tw`bg-white p-1 h-9 px-3 rounded-md`}
          titleStyle={tw`text-primary font-PoppinsRegular`}
          onPress={() => {
            console.log("Download");
          }}
        />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw`bg-base `}
      >
        <View style={tw`px-4 gap-4 mt-5 mb-5`}>
          {/* VIdeo Player */}
          <View style={tw`rounded-md `}>
            <View
              style={tw`w-full h-52 justify-center items-center rounded-md `}
            >
              {status === "idle" || status === "loading" ? (
                <View
                  style={tw`flex-1 w-full border-opacity-15 rounded-md justify-center items-center border border-primary`}
                >
                  <ActivityIndicator size="large" color="#4B5320" />
                </View>
              ) : status === "readyToPlay" ? (
                <VideoView
                  style={tw` h-52 w-full rounded-md`}
                  player={player}
                  allowsFullscreen
                  contentFit="fill"
                />
              ) : status === "error" && error ? (
                <View
                  style={tw`flex-1 w-full rounded-md justify-center items-center border border-primary border-opacity-15`}
                >
                  <SvgXml width={100} height={100} xml={IconNoVideo} />
                  <Text
                    style={tw`text-center text-base font-PoppinsMedium text-primary`}
                  >
                    No video found
                  </Text>
                </View>
              ) : null}
            </View>
          </View>
          {/* Video Details */}
          <View
            style={tw`gap-1.5 flex-1 flex-row justify-between items-center `}
          >
            <Text style={tw`font-PoppinsSemiBold text-base flex-1`}>
              Trainging video part 1
            </Text>
            <Text
              style={tw`bg-primary text-white text-center text-xs py-1 self-start px-2 rounded-md font-PoppinsMedium `}
            >
              Welcome to Node.js
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
        <View style={tw`flex-row pt-6 pb-2 px-4 gap-3 items-center `}>
          <Text style={tw`font-PoppinsSemiBold text-lg`}>Related Videos</Text>
        </View>
        <View style={tw`bg-gray-100 py-10 rounded-t-3xl px-4`}>
          <View style={tw`border border-gray-300 rounded-lg py-4 px-2 gap-5 `}>
            {tutorials?.map((tutorial) => (
              <VideoCard key={tutorial.id} tutorial={tutorial} />
            ))}
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

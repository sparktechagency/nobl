import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";

import { Alert, Platform, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";

import BackWithComponent from "@/lib/backHeader/BackWithCoponent";
import { IconDownload } from "@/icons/Icon";
import ImageZoomer from "@/lib/imageZoomer/ImageZoomer";
import IwtButton from "@/lib/buttons/IwtButton";
import { PrimaryColor } from "@/utils/utils";
import React from "react";
import tw from "@/lib/tailwind";

const PictureShow = () => {
  const { link } = useLocalSearchParams();

  const [loading, setLoading] = React.useState(false);
  const downloadPhoto = async () => {
    setLoading(true);
    try {
      // Request permissions (needed for Android)
      if (Platform.OS === "android") {
        const { status } = await MediaLibrary.requestPermissionsAsync();
        if (status !== "granted") {
          Alert.alert(
            "Permission required",
            "Please grant storage permissions to download photos"
          );
          setLoading(false);
          return;
        }
      }

      const uri = link || "";
      const fileName = `photo-${Date.now()}.jpg`;

      // For Android: Save to downloads folder
      if (Platform.OS === "android") {
        const downloadDir = `${FileSystem.documentDirectory}Download/`;
        await FileSystem.makeDirectoryAsync(downloadDir, {
          intermediates: true,
        });
        const fileUri = `${downloadDir}${fileName}`;

        await FileSystem.downloadAsync(uri as string, fileUri);

        // Save to media library to make it visible in gallery
        setLoading(false);
        await MediaLibrary.saveToLibraryAsync(fileUri);
        Alert.alert(
          "Success",
          "Photo saved to your Downloads folder and gallery"
        );
      }
      // For iOS: Save to media library
      else {
        const fileUri = `${FileSystem.cacheDirectory}${fileName}`;
        await FileSystem.downloadAsync(uri as string, fileUri);
        await MediaLibrary.saveToLibraryAsync(fileUri);
        setLoading(false);
        // Show success message
        Alert.alert("Success", "Photo saved to your camera roll");
      }
    } catch (error) {
      setLoading(false);
      // Handle error
      console.error("Error downloading photo:", error);
      Alert.alert("Error", "Failed to download photo");
    }
  };

  // console.log(data);

  return (
    <View style={tw`flex-1 bg-white`}>
      {/* Header Parts  */}
      <View
        style={[
          tw`flex-row z-50 justify-between pb-2 items-center bg-primary pr-4`,
          {
            paddingTop: Platform.OS === "android" ? 5 : 0,
          },
        ]}
      >
        <BackWithComponent onPress={() => router.back()} />
        <IwtButton
          title="Download"
          isLoading={loading}
          loadingColor={PrimaryColor}
          svg={IconDownload}
          // disabled={status === "loading"}
          containerStyle={tw`bg-white  p-1 h-9 px-3 rounded-md `}
          titleStyle={tw`text-primary font-PoppinsRegular`}
          onPress={() => {
            downloadPhoto();
          }}
        />
      </View>
      <View style={tw`w-full h-[80%]  z-0`}>
        {/* <Image
          source={{ uri: link as string }}
          style={tw`w-full h-full  `}
          contentFit="contain"
        /> */}

        <ImageZoomer uri={link as string} />
      </View>
    </View>
  );
};

export default PictureShow;

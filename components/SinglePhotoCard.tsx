import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";

import { Alert, Platform, Pressable, Text } from "react-native";

import { IconDownload } from "@/icons/Icon";
import IButton from "@/lib/buttons/IButton";
import tw from "@/lib/tailwind";
import { _HIGHT } from "@/utils/utils";
import { Image } from "expo-image";
import React from "react";

const SinglePhotoCard = ({ photo }: { photo?: any }) => {
  const [loading, setLoading] = React.useState(false);
  const [height, setHeight] = React.useState(0);

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

      const uri = photo?.thumbnail || "";
      const fileName = `photo-${photo?.id}-${Date.now()}.jpg`;

      // For Android: Save to downloads folder
      if (Platform.OS === "android") {
        const downloadDir = `${FileSystem.documentDirectory}Download/`;
        await FileSystem.makeDirectoryAsync(downloadDir, {
          intermediates: true,
        });
        const fileUri = `${downloadDir}${fileName}`;

        await FileSystem.downloadAsync(uri, fileUri);

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
        await FileSystem.downloadAsync(uri, fileUri);
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

  return (
    <Pressable style={tw`m-1 relative rounded-md overflow-hidden`}>
      <Image
        source={{ uri: photo?.thumbnail }}
        style={{
          width: "100%",
          height: _HIGHT * 0.2,
        }}
        contentFit="cover"
      />
      <Text
        style={tw`absolute px-2 py-1 bottom-2 left-2 rounded-md bg-primary text-white font-PoppinsRegular text-[0.56rem]`}
      >
        {photo?.category?.name}
      </Text>
      <IButton
        svg={IconDownload}
        isLoading={loading}
        onPress={downloadPhoto}
        containerStyle={tw`absolute top-2 right-2 bg-deepBlue50 w-8 h-8 rounded-md p-2`}
      />
    </Pressable>
  );
};

export default SinglePhotoCard;

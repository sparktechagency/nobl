import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";

import {
  Alert,
  Platform,
  Pressable,
  Text,
  useWindowDimensions,
} from "react-native";

import { Image } from "expo-image";
import React from "react";
import tw from "@/lib/tailwind";

const PhotoCard = ({
  photo,
}: {
  photo: {
    id: number;
    category: string;
    image: string;
  };
}) => {
  const { width: screenWidth } = useWindowDimensions();
  const cardPadding = 16;
  const gap = 8;
  const maxColumns = 2;
  const availableWidth = screenWidth - cardPadding * 2 - gap;
  const aspectRatio = 0.8 + Math.random() * 0.7;
  const width = availableWidth / maxColumns;
  const height = width * aspectRatio;

  const downloadPhoto = async () => {
    try {
      // Request permissions (needed for Android)
      if (Platform.OS === "android") {
        const { status } = await MediaLibrary.requestPermissionsAsync();
        if (status !== "granted") {
          Alert.alert(
            "Permission required",
            "Please grant storage permissions to download photos"
          );
          return;
        }
      }

      const uri = photo.image;
      const fileName = `photo-${photo.id}-${Date.now()}.jpg`;

      // For Android: Save to downloads folder
      if (Platform.OS === "android") {
        const downloadDir = `${FileSystem.documentDirectory}Download/`;
        await FileSystem.makeDirectoryAsync(downloadDir, {
          intermediates: true,
        });
        const fileUri = `${downloadDir}${fileName}`;

        await FileSystem.downloadAsync(uri, fileUri);

        // Save to media library to make it visible in gallery
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
        Alert.alert("Success", "Photo saved to your camera roll");
      }
    } catch (error) {
      console.error("Error downloading photo:", error);
      Alert.alert("Error", "Failed to download photo");
    }
  };

  return (
    <Pressable
      onLongPress={() => {
        Alert.alert(
          "Download",
          "Are you sure you want to download this photo?",
          [
            {
              text: "Cancel",
              style: "cancel",
            },
            {
              text: "Download",
              onPress: downloadPhoto,
            },
          ]
        );
      }}
      style={[
        tw`bg-white rounded-lg overflow-hidden mb-2`,
        {
          width: width,
          marginRight: gap,
        },
      ]}
    >
      <Image
        source={{ uri: photo?.image }}
        style={{
          width: "100%",
          height: height,
        }}
        contentFit="cover"
      />
      <Text
        style={tw`absolute px-2 py-1 bottom-2 left-2 rounded-md bg-primary text-white font-PoppinsRegular text-sm`}
      >
        {photo.category}
      </Text>
    </Pressable>
  );
};

export default PhotoCard;

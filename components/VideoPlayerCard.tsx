import * as FileSystem from "expo-file-system";

import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { PrimaryColor, _WIGHT } from "@/utils/utils";
import React, { useEffect, useState } from "react";
import { VideoSource, VideoView, useVideoPlayer } from "expo-video";

import { useEvent } from "expo";

interface VideoPlayerCardProps {
  source: VideoSource;
}

const VideoPlayerCard = ({ source }: VideoPlayerCardProps) => {
  const [cachedSource, setCachedSource] = useState<VideoSource | null>(null);
  const [downloadError, setDownloadError] = useState(false);

  // console.log(`video-${source?.toString()?.split("/").pop()}`);

  // Cache the video to local file system
  useEffect(() => {
    const downloadVideo = async (source: VideoSource) => {
      try {
        const fileUri =
          FileSystem.documentDirectory +
          `${source?.toString()?.split("/").pop()}`;

        const fileInfo = await FileSystem?.getInfoAsync(fileUri);
        // console.log("Downloading video...", fileUri);
        // Check if file already exists
        // console.log(fileInfo);
        if (fileInfo.exists) {
          console.log("Video already cached");
          setCachedSource(fileInfo?.uri as VideoSource);
          return;
        } else {
          await FileSystem?.downloadAsync(source as any, fileUri);
          console.log("Downloading video...");
        }
        // console.log(fileUri, fileInfo);
        setCachedSource(fileUri as VideoSource);
      } catch (error: any) {
        console.error("Download error:", error);
        setDownloadError(true);
      }
    };

    downloadVideo(source);
  }, [source]);

  const player = useVideoPlayer(
    downloadError ? source : (cachedSource as VideoSource),
    (player) => {
      player.play();
    }
  );

  const { status, error } = useEvent(player, "statusChange", {
    status: player.status,
  });

  return (
    <View>
      {status === "loading" && (
        <View style={[styles.video, styles.absoluteCenter]}>
          <ActivityIndicator color={PrimaryColor} size="large" />
        </View>
      )}
      {status === "error" && (
        <View style={[styles.video, styles.absoluteCenter]}>
          <Text style={{ color: "red", textAlign: "center" }}>
            Failed to load video: {error?.message}
          </Text>
        </View>
      )}

      <VideoView player={player} style={styles.video} />
    </View>
  );
};

export default React.memo(VideoPlayerCard);

const styles = StyleSheet.create({
  video: {
    width: _WIGHT,
    aspectRatio: 16 / 9,
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  absoluteCenter: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 100,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});

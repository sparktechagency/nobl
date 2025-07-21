import { PrimaryColor, _WIGHT } from "@/utils/utils";
import { VideoSource, VideoView, useVideoPlayer } from "expo-video";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

import { useEvent } from "expo";
import React from "react";

interface VideoPlayerCardProps {
  source: string | VideoSource;
}

const VideoPlayerCard = ({ source }: VideoPlayerCardProps) => {
  const player = useVideoPlayer(source, (player) => {
    player.play();
  });

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

import { ActivityIndicator, StyleSheet, View } from "react-native";
import { PrimaryColor, _WIGHT } from "@/utils/utils";
import { VideoSource, VideoView, useVideoPlayer } from "expo-video";

import { useEvent } from "expo";

interface VideoPlayerCardProps {
  source: VideoSource;
}

export default function VideoPlayerCard({ source }: VideoPlayerCardProps) {
  const player = useVideoPlayer(source as VideoSource, (player) => {
    player.play();
    player.showNowPlayingNotification = true;
    player.allowsExternalPlayback = true;
  });

  const { status, error } = useEvent(player, "statusChange", {
    status: player.status,
  });

  // console.log(status, error);

  return (
    <View>
      {status == "loading" && (
        <View
          style={[
            styles.video,
            { justifyContent: "center", position: "absolute" },
          ]}
        >
          <ActivityIndicator color={PrimaryColor} size="large" />
        </View>
      )}
      <VideoView
        player={player}
        style={styles.video}
        // nativeControls={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 50,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 3,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "#4630ec",
  },
  buttonText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#eeeeee",
    textAlign: "center",
  },
  video: {
    width: _WIGHT,
    aspectRatio: 16 / 9,
  },
});

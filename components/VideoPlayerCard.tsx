import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { PrimaryColor, _WIGHT } from "@/utils/utils";
import { VideoSource, VideoView, useVideoPlayer } from "expo-video";
import { useEvent } from "expo";
import React from "react";

interface VideoPlayerCardProps {
  source: VideoSource;
}

 const  VideoPlayerCard = ({ source }: VideoPlayerCardProps) => {
  //  console.log(source)
  const player = useVideoPlayer(
    source as VideoSource,
    (player) => {
      player.play();
      player.showNowPlayingNotification = true;
      player.allowsExternalPlayback = true;
      player.staysActiveInBackground = true;
    }
  );


  const { status, error } = useEvent(player, "statusChange", {
    status: player.status,
  });



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
      {status === "error" && (
        <View style={[
          styles.video,
          { justifyContent: "center", position: "absolute" },
        ]}>
          <Text style={{ color: 'red', textAlign: 'center' }}>
            Failed to load video: {error?.message}
          </Text>
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

export default React.memo(VideoPlayerCard)

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

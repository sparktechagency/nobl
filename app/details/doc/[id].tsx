import { Text, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

import BackWithComponent from "@/lib/backHeader/BackWithCoponent";
import { IconDownload } from "@/icons/Icon";
import IwtButton from "@/lib/buttons/IwtButton";
import React from "react";
import tutorialData from "@/assets/data/tutorials.json";
import tw from "@/lib/tailwind";
import { useEvent } from "expo";
import { useVideoPlayer } from "expo-video";

const Document = () => {
  const router = useRouter();
  const [tutorials, setTutorials] = React.useState(tutorialData.tutorials);
  const [selectedTutorial, setSelectedTutorial] = React.useState(null);

  const { id } = useLocalSearchParams();

  const videoSource = selectedTutorial?.video;

  const player = useVideoPlayer(videoSource, (player) => {
    console.log("player", player);
    player.play();
  });

  React.useEffect(() => {
    const tutorial = tutorials.find((tutorial) => tutorial.id === Number(id));

    if (tutorial) {
      setSelectedTutorial(tutorial);
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
      <View style={tw`flex-1 bg-white`}>
        <Text>Document</Text>
      </View>
    </View>
  );
};

export default Document;

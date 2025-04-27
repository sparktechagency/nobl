import { IconHistoryClock, IconSettings } from "@/icons/Icon";
import { ScrollView, Text, View } from "react-native";

import VideoCard from "@/components/VideoCard";
import IButton from "@/lib/buttons/IButton";
import tw from "@/lib/tailwind";
import { useRouter } from "expo-router";
import React from "react";
import { SvgXml } from "react-native-svg";
import { Avatar } from "react-native-ui-lib";
import tutorialData from "../../assets/data/tutorials.json";

const index = () => {
  const router = useRouter();
  const [tutorials, setTutorials] = React.useState(tutorialData.tutorials);

  return (
    <View style={tw`flex-1 bg-base`}>
      {/* Header Parts  */}
      <View
        style={tw`flex-row justify-between items-start py-8 px-4 gap-3 bg-primary`}
      >
        <View style={tw`gap-2`}>
          <Text style={tw`text-white font-PoppinsBold text-xl`}>
            Good Afternoon,
          </Text>
          <View
            style={tw`flex-row items-center gap-2 border border-white self-start px-3 py-1 rounded-md`}
          >
            <Avatar size={37} source={require("@/assets/images/avatar.png")} />
            <Text style={tw`text-white font-PoppinsMedium text-lg`}>
              Md. Abid Hasan
            </Text>
          </View>
        </View>
        <IButton
          onPress={() => {
            router.push("/setting");
          }}
          icon={<SvgXml xml={IconSettings} />}
          containerStyle={tw`self-start p-0 bg-transparent`}
        />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw`bg-base `}
      >
        <View style={tw`flex-row pt-6 pb-2 px-4 gap-3 items-center `}>
          <SvgXml xml={IconHistoryClock} />
          <Text style={tw`font-PoppinsRegular text-base`}>
            Recent Activities
          </Text>
        </View>
        <View style={tw`bg-gray-100 py-10 rounded-t-3xl px-4`}>
          <View style={tw`border border-gray-300 rounded-lg py-4 px-2 gap-5 `}>
            {tutorials?.map((tutorial) => (
              <VideoCard key={tutorial.id} tutorial={tutorial} />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default index;

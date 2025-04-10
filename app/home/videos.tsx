import { IconArrowDown, IconClose, IconFilter } from "@/icons/Icon";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

import IButton from "@/lib/buttons/IButton";
import React from "react";
import SideModal from "@/lib/modals/SideModal";
import { SvgXml } from "react-native-svg";
import VideoCard from "@/components/VideoCard";
import tutorialData from "../../assets/data/tutorials.json";
import tw from "@/lib/tailwind";
import { useRouter } from "expo-router";

const video = () => {
  const router = useRouter();
  const [tutorials, setTutorials] = React.useState(tutorialData.tutorials);
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  return (
    <View style={tw`flex-1 bg-white`}>
      {/* Header Parts  */}
      <View
        style={tw`flex-row justify-between items-start py-6 px-4 gap-5 bg-primary`}
      >
        <View style={tw`gap-2`}>
          <Text style={tw`text-white font-PoppinsRegular text-lg `}>
            Training Videos
          </Text>
        </View>
        <TouchableOpacity
          style={tw`flex-row items-center gap-4 border border-gray-200 px-2 py-1 rounded`}
          onPress={() => setIsModalVisible(true)}
        >
          <View style={tw`flex-row items-center gap-2 `}>
            <SvgXml xml={IconFilter} />
            <Text style={tw`text-white font-PoppinsRegular text-sm`}>
              Filter
            </Text>
          </View>
          <SvgXml xml={IconArrowDown} />
        </TouchableOpacity>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw`bg-base `}
      >
        <View style={tw`flex-row pt-6 pb-2 px-4 gap-3 items-center `}></View>
        <View style={tw`bg-white py-10 rounded-t-3xl px-4`}>
          <View style={tw`border border-gray-300 rounded-lg py-4 px-2 gap-5 `}>
            {tutorials?.map((tutorial) => (
              <VideoCard key={tutorial.id} tutorial={tutorial} />
            ))}
          </View>
        </View>
      </ScrollView>

      <SideModal
        visible={isModalVisible}
        setVisible={() => setIsModalVisible(false)}
        containerStyle={tw`bg-primary`}
        scrollable
        props={{
          renderPannableHeader: () => (
            <View
              style={tw`flex-row justify-between items-center bg-primary p-2`}
            >
              <View />
              <View>
                <Text style={tw`text-white font-PoppinsRegular text-base `}>
                  Select a category
                </Text>
              </View>
              <IButton
                svg={IconClose}
                onPress={() => setIsModalVisible(false)}
                containerStyle={tw`bg-transparent self-end`}
              />
            </View>
          ),
        }}
      >
        <ScrollView
          style={tw`h-[40rem]`}
          // showsVerticalScrollIndicator={false}
        >
          <View style={tw`bg-white  p-4 gap-3`}>
            <View
              style={tw`border border-primary border-opacity-25 rounded-lg p-2`}
            >
              <Text style={tw`font-PoppinsMedium text-base`}>All</Text>
            </View>
            <View
              style={tw`border border-primary border-opacity-25 rounded-lg p-2`}
            >
              <Text style={tw`font-PoppinsMedium text-base`}>
                Welcome to NOBL
              </Text>
            </View>
            <View
              style={tw`border border-primary border-opacity-25 rounded-lg p-2`}
            >
              <Text style={tw`font-PoppinsMedium text-base`}>Introduction</Text>
            </View>
            <View
              style={tw`border border-primary border-opacity-25 rounded-lg p-2`}
            >
              <Text style={tw`font-PoppinsMedium text-base`}>
                Key to success in this industry
              </Text>
            </View>
            <View
              style={tw`border border-primary border-opacity-25 rounded-lg p-2`}
            >
              <Text style={tw`font-PoppinsMedium text-base`}>
                Door approach / Pitch
              </Text>
            </View>
            <View
              style={tw`border border-primary border-opacity-25 rounded-lg p-2`}
            >
              <Text style={tw`font-PoppinsMedium text-base`}>
                Transitioning
              </Text>
            </View>
            <View
              style={tw`border border-primary border-opacity-25 rounded-lg p-2`}
            >
              <Text style={tw`font-PoppinsMedium text-base`}>
                Building Value
              </Text>
            </View>
            <View
              style={tw`border border-primary border-opacity-25 rounded-lg p-2`}
            >
              <Text style={tw`font-PoppinsMedium text-base`}>
                Qualify Questions
              </Text>
            </View>
            <View
              style={tw`border border-primary border-opacity-25 rounded-lg p-2`}
            >
              <Text style={tw`font-PoppinsMedium text-base`}>
                Buying Atmosphere
              </Text>
            </View>
            <View
              style={tw`border border-primary border-opacity-25 rounded-lg p-2`}
            >
              <Text style={tw`font-PoppinsMedium text-base`}>Amply Value</Text>
            </View>
            <View
              style={tw`border border-primary border-opacity-25 rounded-lg p-2`}
            >
              <Text style={tw`font-PoppinsMedium text-base`}>
                Drop Price / Compare Price
              </Text>
            </View>
            <View
              style={tw`border border-primary border-opacity-25 rounded-lg p-2`}
            >
              <Text style={tw`font-PoppinsMedium text-base`}>
                Closing Lines
              </Text>
            </View>
            <View
              style={tw`border border-primary border-opacity-25 rounded-lg p-2`}
            >
              <Text style={tw`font-PoppinsMedium text-base`}>
                Area Management
              </Text>
            </View>
            <View
              style={tw`border border-primary border-opacity-25 rounded-lg p-2`}
            >
              <Text style={tw`font-PoppinsMedium text-base`}>
                How to use your IPad Resources
              </Text>
            </View>
            <View
              style={tw`border border-primary border-opacity-25 rounded-lg p-2`}
            >
              <Text style={tw`font-PoppinsMedium text-base`}>
                How to use your IPad Resources
              </Text>
            </View>
            <View
              style={tw`border border-primary border-opacity-25 rounded-lg p-2`}
            >
              <Text style={tw`font-PoppinsMedium text-base`}>
                How to use your IPad Resources
              </Text>
            </View>
            <View
              style={tw`border border-primary border-opacity-25 rounded-lg p-2`}
            >
              <Text style={tw`font-PoppinsMedium text-base`}>
                How to use your IPad Resources
              </Text>
            </View>
            <View
              style={tw`border border-primary border-opacity-25 rounded-lg p-2`}
            >
              <Text style={tw`font-PoppinsMedium text-base`}>
                How to use your IPad Resources
              </Text>
            </View>
            <View
              style={tw`border border-primary border-opacity-25 rounded-lg p-2`}
            >
              <Text style={tw`font-PoppinsMedium text-base`}>
                How to use your IPad Resources
              </Text>
            </View>
            <View
              style={tw`border border-primary border-opacity-25 rounded-lg p-2`}
            >
              <Text style={tw`font-PoppinsMedium text-base`}>
                How to use your IPad Resources
              </Text>
            </View>
            <View
              style={tw`border border-primary border-opacity-25 rounded-lg p-2`}
            >
              <Text style={tw`font-PoppinsMedium text-base`}>
                How to use your IPad Resources
              </Text>
            </View>
            <View
              style={tw`border border-primary border-opacity-25 rounded-lg p-2`}
            >
              <Text style={tw`font-PoppinsMedium text-base`}>
                How to use your IPad Resources
              </Text>
            </View>
            <View
              style={tw`border border-primary border-opacity-25 rounded-lg p-2`}
            >
              <Text style={tw`font-PoppinsMedium text-base`}>
                How to use your IPad Resources
              </Text>
            </View>
          </View>
        </ScrollView>
      </SideModal>
    </View>
  );
};

export default video;

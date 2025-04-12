import { IconArrowDown, IconClose, IconFilter } from "@/icons/Icon";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

import { Galeria } from "@nandorojo/galeria";
import IButton from "@/lib/buttons/IButton";
import { MasonryFlashList } from "@shopify/flash-list";
import PhotoCard from "@/components/PhotoCard";
import Photos from "../../assets/data/photos.json";
import React from "react";
import SideModal from "@/lib/modals/SideModal";
import { SvgXml } from "react-native-svg";
import tw from "@/lib/tailwind";
import { useRouter } from "expo-router";

const photos = () => {
  const router = useRouter();
  const [photos, setPhotos] = React.useState(Photos);
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  return (
    <View style={tw`flex-1 bg-white`}>
      {/* Header Parts  */}
      <View
        style={tw`flex-row justify-between items-start py-6 px-4 gap-5 bg-primary`}
      >
        <View style={tw`gap-2`}>
          <Text style={tw`text-white font-PoppinsRegular text-lg `}>
            Photos
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
        <View style={tw`flex-row pt-4 pb-2 px-4 gap-3 items-center `}></View>
        <View style={tw`flex-1 bg-white pb-10 pt-4 rounded-t-3xl px-4`}>
          <Galeria urls={photos.map((photo) => photo.image)}>
            <MasonryFlashList
              scrollEnabled={false}
              data={photos}
              numColumns={2}
              renderItem={({ item }) => (
                <Galeria.Image index={photos.indexOf(item)}>
                  <PhotoCard photo={item} />
                </Galeria.Image>
              )}
              estimatedItemSize={200}
              keyExtractor={(item) => item.id.toString()}
            />
            <Galeria.Popup disableTransition="web" />
          </Galeria>
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
          style={tw`h-[35rem] bg-white`}
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
              <Text style={tw`font-PoppinsMedium text-base`}>Amply Value</Text>
            </View>
            <View
              style={tw`border border-primary border-opacity-25 rounded-lg p-2`}
            >
              <Text style={tw`font-PoppinsMedium text-base`}>Category 1</Text>
            </View>
            <View
              style={tw`border border-primary border-opacity-25 rounded-lg p-2`}
            >
              <Text style={tw`font-PoppinsMedium text-base`}>Category 2</Text>
            </View>
            <View
              style={tw`border border-primary border-opacity-25 rounded-lg p-2`}
            >
              <Text style={tw`font-PoppinsMedium text-base`}>Category 3</Text>
            </View>
            <View
              style={tw`border border-primary border-opacity-25 rounded-lg p-2`}
            >
              <Text style={tw`font-PoppinsMedium text-base`}>Category 4</Text>
            </View>
            <View
              style={tw`border border-primary border-opacity-25 rounded-lg p-2`}
            >
              <Text style={tw`font-PoppinsMedium text-base`}>Category 5</Text>
            </View>
          </View>
        </ScrollView>
      </SideModal>
    </View>
  );
};

export default photos;

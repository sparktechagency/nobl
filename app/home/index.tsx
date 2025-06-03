import { FlatList, RefreshControl, ScrollView, Text, View } from "react-native";
import { PrimaryColor, _HIGHT } from "@/utils/utils";

import AudioCard from "@/components/AudioCard";
import DocumentCard from "@/components/DocumentCard";
import EmptyCard from "@/lib/Empty/EmptyCard";
import { IconHistoryClock } from "@/icons/Icon";
import MainHeader from "@/components/MainHeader";
import React from "react";
import SinglePhotoCard from "@/components/SinglePhotoCard";
import { SvgXml } from "react-native-svg";
import VideoCard from "@/components/VideoCard";
import tw from "@/lib/tailwind";
import { useGetHomeQuery } from "@/redux/apiSlices/user/userApiSlices";

const index = () => {
  const {
    data: HomeData,
    isFetching,
    isLoading,
    refetch,
  } = useGetHomeQuery({
    params: {
      per_page: 500,
    },
  });

  // console.log(HomeData)

  return (
    <View style={tw`flex-1 bg-base`}>
      {/* Header Parts  */}
      <MainHeader />
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={refetch}
            colors={[PrimaryColor]}
          />
        }
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
            <FlatList
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={() => (
                <EmptyCard
                  isLoading={isFetching || isLoading}
                  hight={_HIGHT * 0.5}
                />
              )}
              data={HomeData?.data}
              keyExtractor={(item) => item.id + item.type}
              contentContainerStyle={tw`gap-4`}
              renderItem={({ index, item }) => {
                return (
                  <React.Fragment>
                    {item?.type === "video" && <VideoCard tutorial={item} />}
                    {item?.type === "document" && (
                      <DocumentCard document={item} />
                    )}
                    {item?.type === "audio" && <AudioCard audio={item} />}
                    {item?.type === "photo" && <SinglePhotoCard photo={item} />}
                  </React.Fragment>
                );
              }}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default index;

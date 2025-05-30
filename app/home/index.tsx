import { PrimaryColor, _HIGHT } from "@/utils/utils";
import { FlatList, RefreshControl, ScrollView, Text, View } from "react-native";

import AudioCard from "@/components/AudioCard";
import DocumentCard from "@/components/DocumentCard";
import MainHeader from "@/components/MainHeader";
import SinglePhotoCard from "@/components/SinglePhotoCard";
import VideoCard from "@/components/VideoCard";
import { IconHistoryClock } from "@/icons/Icon";
import EmptyCard from "@/lib/Empty/EmptyCard";
import tw from "@/lib/tailwind";
import { useGetHomeQuery } from "@/redux/apiSlices/user/userApiSlices";
import React from "react";
import { SvgXml } from "react-native-svg";

const index = () => {
  const {
    data: HomeData,
    isFetching,
    isLoading,
    refetch,
  } = useGetHomeQuery({});

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
                    {item?.type === "video" && (
                      <VideoCard key={item.id} tutorial={item} />
                    )}
                    {item?.type === "document" && (
                      <DocumentCard key={item.id} document={item} />
                    )}
                    {item?.type === "audio" && (
                      <AudioCard key={item.id} audio={item} />
                    )}
                    {item?.type === "photo" && (
                      <SinglePhotoCard key={item.id} photo={item} />
                    )}
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

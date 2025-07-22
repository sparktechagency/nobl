import { FlatList, RefreshControl, ScrollView, View } from "react-native";

import EmptyCard from "@/lib/Empty/EmptyCard";
import Header from "@/components/Header";
import React from "react";
import VideoCard from "@/components/VideoCard";
import { _HIGHT } from "@/utils/utils";
import tw from "@/lib/tailwind";
import { useGetVideosQuery } from "@/redux/apiSlices/user/userApiSlices";

const video = () => {
  const [selectedCategory, setSelectedCategory] = React.useState<number | null>(
    null
  );

  const {
    data: Data,
    isFetching,
    isLoading,
    refetch,
  } = useGetVideosQuery({
    params: {
      category_id: selectedCategory || null,
    },
  });
  return (
    <View style={tw`flex-1 bg-base`}>
      {/* Header Parts  */}
      <Header
        title="Trading Videos"
        type="Video Category"
        onSelectCategory={(category) => {
          setSelectedCategory(category?.value || null);
        }}
      />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={refetch} />
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw`bg-base gap-4`}
      >
        {/* <View style={tw`flex-row  pb-2 px-3 gap-3 items-center `} /> */}
        <View style={tw` py-3  px-4`}>
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
              keyExtractor={(item) => item?.id}
              data={Data?.data?.data}
              contentContainerStyle={tw`gap-4`}
              renderItem={({ index, item }) => {
                return <VideoCard tutorial={item} />;
              }}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default video;

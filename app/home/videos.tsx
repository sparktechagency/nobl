import { FlatList, RefreshControl, ScrollView, View } from "react-native";

import Header from "@/components/Header";
import VideoCard from "@/components/VideoCard";
import EmptyCard from "@/lib/Empty/EmptyCard";
import tw from "@/lib/tailwind";
import { useGetVideosQuery } from "@/redux/apiSlices/user/userApiSlices";
import { _HIGHT } from "@/utils/utils";
import React from "react";

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
        <View style={tw`flex-row pt-3 pb-2 px-3 gap-3 items-center `} />
        <View style={tw`bg-gray-100 py-8 rounded-t-3xl px-4`}>
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
              data={Data?.data?.data}
              contentContainerStyle={tw`gap-4`}
              renderItem={({ index, item }) => {
                return <VideoCard key={item.id} tutorial={item} />;
              }}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default video;

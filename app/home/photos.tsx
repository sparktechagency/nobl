import { RefreshControl, ScrollView, View } from "react-native";

import EmptyCard from "@/lib/Empty/EmptyCard";
import Header from "@/components/Header";
import { MasonryFlashList } from "@shopify/flash-list";
import PhotoCard from "@/components/PhotoCard";
import React from "react";
import { _HIGHT } from "@/utils/utils";
import tw from "@/lib/tailwind";
import { useGetPhotosQuery } from "@/redux/apiSlices/user/userApiSlices";

const photos = () => {
  const [selectedCategory, setSelectedCategory] = React.useState<number | null>(
    null
  );

  const {
    data: PhotosData,
    isFetching,
    isLoading,
    refetch,
  } = useGetPhotosQuery({
    params: {
      category_id: selectedCategory || null,
    },
  });

  // console.log(PhotosData);
  return (
    <View style={tw`flex-1 bg-base`}>
      {/* Header Parts  */}
      <Header
        title="Photos"
        type="Image Category"
        onSelectCategory={(category) => {
          setSelectedCategory(category?.value || null);
        }}
      />

      <ScrollView
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={refetch} />
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw`bg-base gap-4 `}
      >
        <View
          style={tw`mt-3 bg-base flex-row pt-4 pb-2 px-4 gap-3 items-center `}
        />
        <View style={tw`flex-1 bg-gray-100 pb-10 pt-4 rounded-t-3xl px-4`}>
          {/* <Galeria urls={PhotosData?.data?.data.map((photo) => photo?.photo)}> */}
          <MasonryFlashList
            scrollEnabled={false}
            data={PhotosData?.data?.data}
            ListEmptyComponent={() => {
              return (
                <EmptyCard
                  hight={_HIGHT * 0.65}
                  isLoading={isFetching || isLoading}
                />
              );
            }}
            numColumns={2}
            renderItem={({ item }) => <PhotoCard photo={item} />}
            estimatedItemSize={200}
          />
          {/* <Galeria.Image index={PhotosData?.data?.data.indexOf(item)}>
              </Galeria.Image> */}
          {/* <Galeria.Popup disableTransition="web" /> */}
          {/* </Galeria> */}
        </View>
      </ScrollView>
    </View>
  );
};

export default photos;

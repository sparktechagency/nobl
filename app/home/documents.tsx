import { FlatList, RefreshControl, ScrollView, View } from "react-native";

import DocumentCard from "@/components/DocumentCard";
import Header from "@/components/Header";
import EmptyCard from "@/lib/Empty/EmptyCard";
import tw from "@/lib/tailwind";
import { useGetDocumentQuery } from "@/redux/apiSlices/user/userApiSlices";
import { _HIGHT } from "@/utils/utils";
import React from "react";

const document = () => {
  const [selectedCategory, setSelectedCategory] = React.useState<number | null>(
    null
  );

  const {
    data: Data,
    isFetching,
    isLoading,
    refetch,
  } = useGetDocumentQuery({
    params: {
      category_id: selectedCategory || null,
    },
  });
  return (
    <View style={tw`flex-1 bg-base`}>
      {/* Header Parts  */}
      <Header
        title="Documents"
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
                return <DocumentCard key={item.id} document={item} />;
              }}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default document;

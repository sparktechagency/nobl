import {
  FlatList,
  LogBox,
  RefreshControl,
  View,
  useWindowDimensions,
} from "react-native";
import { PrimaryColor, _HIGHT } from "@/utils/utils";

import BackWithComponent from "@/lib/backHeader/BackWithCoponent";
import EmptyCard from "@/lib/Empty/EmptyCard";
import React from "react";
import RenderHtml from "react-native-render-html";
import { router } from "expo-router";
import tw from "@/lib/tailwind";
import { useGetAdditionalPageQuery } from "@/redux/apiSlices/user/userApiSlices";

LogBox.ignoreAllLogs();

const terms_and_conditions = () => {
  const { width } = useWindowDimensions();
  const { data, isFetching, isLoading, refetch } = useGetAdditionalPageQuery({
    params: {
      type: "Terms & Conditions",
    },
  });

  const source = {
    html: data?.data![0].text,
  };
  return (
    <View style={tw`flex-1 bg-white`}>
      <View style={tw`h-13 bg-primary`}>
        <BackWithComponent
          onPress={() => router.back()}
          title="Terms & Conditions"
          togather
        />
      </View>
      <FlatList
        ListEmptyComponent={() => (
          <EmptyCard
            hight={_HIGHT * 0.65}
            isLoading={isFetching || isLoading}
          />
        )}
        data={data?.data}
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={refetch}
            colors={[PrimaryColor]}
          />
        }
        style={tw`px-5`}
        contentContainerStyle={tw`py-10`}
        showsVerticalScrollIndicator={false}
        renderItem={({}) => {
          return (
            <RenderHtml
              // baseStyle={tw`font-PoppinsRegular text-base my-10`}
              contentWidth={width}
              source={source}
            />
          );
        }}
      />
    </View>
  );
};

export default terms_and_conditions;

import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { IconArrowDown, IconClose, IconFilter } from "@/icons/Icon";

import BottomModal from "@/lib/modals/BottomModal";
import EmptyCard from "@/lib/Empty/EmptyCard";
import IButton from "@/lib/buttons/IButton";
import React from "react";
import { SvgXml } from "react-native-svg";
import { _HIGHT } from "@/utils/utils";
import tw from "@/lib/tailwind";
import { useGetUserCategoryQuery } from "@/redux/apiSlices/user/userApiSlices";

interface HeaderProps {
  onSelectCategory?: (category?: {
    label: string;
    value: number | null;
  }) => void;
  offFilter?: boolean;
  title: string;
  type?:
    | "Video Category"
    | "Image Category"
    | "Documents Category"
    | "Audio Category";
}

const Header = ({
  type = "Video Category",
  onSelectCategory,
  title,
  offFilter,
}: HeaderProps) => {
  const {
    data: Categories,
    isFetching,
    isLoading,
  } = useGetUserCategoryQuery({
    params: {
      type: type,
    },
  });
  const [visible, setVisible] = React.useState(false);

  return (
    <>
      <View
        style={tw`flex-row justify-between items-start py-6 px-4 gap-5 bg-primary`}
      >
        <View style={tw`gap-2`}>
          <Text style={tw`text-white font-PoppinsRegular text-lg `}>
            {title || "N/A"}
          </Text>
        </View>
        {!offFilter && (
          <TouchableOpacity
            style={tw`flex-row items-center gap-4 border border-gray-200 px-2 py-1 rounded`}
            onPress={() => setVisible(true)}
          >
            <View style={tw`flex-row items-center gap-2 `}>
              <SvgXml xml={IconFilter} />
              <Text style={tw`text-white font-PoppinsRegular text-sm`}>
                Filter
              </Text>
            </View>
            <SvgXml xml={IconArrowDown} />
          </TouchableOpacity>
        )}
      </View>

      <BottomModal
        height={_HIGHT * 0.6}
        draggable
        visible={visible}
        setVisible={setVisible}
        customStyles={tw`rounded-lg`}
        headerComponent={
          <View
            style={tw`flex-row w-full justify-between items-center bg-primary p-2 `}
          >
            <View />
            <View>
              <Text style={tw`text-white font-PoppinsRegular text-base `}>
                Select a category
              </Text>
            </View>
            <IButton
              svg={IconClose}
              onPress={() => setVisible(false)}
              containerStyle={tw`bg-transparent self-end`}
            />
          </View>
        }
      >
        <FlatList
          // style={tw`h-[35rem]`}
          // scrollEnabled={false}
          ListEmptyComponent={() => (
            <EmptyCard
              isLoading={isFetching || isLoading}
              hight={_HIGHT * 0.6}
            />
          )}
          contentContainerStyle={tw`bg-white p-4 gap-3`}
          data={
            Categories?.data
              ? [
                  { label: "All", value: null },
                  ...Categories?.data?.map((it: any) => {
                    return {
                      label: it.name,
                      value: it.id,
                    };
                  }),
                ]
              : []
          }
          renderItem={({ index, item }) => {
            // console.log(item);
            return (
              <TouchableOpacity
                onPress={() => {
                  onSelectCategory && onSelectCategory(item);
                  setVisible(false);
                }}
                key={item?.value + index}
                style={tw`border border-primary border-opacity-25 rounded-lg p-2`}
              >
                <Text style={tw`font-PoppinsMedium text-base`}>
                  {item?.label}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
        {/* style={tw`h-[35rem]`} */}
      </BottomModal>
    </>
  );
};

export default React.memo(Header);

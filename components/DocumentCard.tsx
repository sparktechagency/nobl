import { IconActiveHome, IconDoc, IconPdf } from "@/icons/Icon";
import { Text, TouchableOpacity, View } from "react-native";

import { Image } from "expo-image";
import React from "react";
import { SvgXml } from "react-native-svg";
import tw from "@/lib/tailwind";
import { useRouter } from "expo-router";

const DocumentCard = ({
  document,
}: {
  document: {
    id: number;
    title: string;
    category: string;
    image: string;
    type: string;
    page: number;
  };
}) => {
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() => router.push(`/details/doc/${document?.id}`)}
      style={tw` rounded-lg bg-white shadow `}
    >
      <Image
        source={{ uri: document.image }}
        style={tw`w-full h-44 border-b-0 border-t-2  border-r-2 border-l-2 border-gray-800 rounded-t-lg`}
        contentFit="fill"
      />
      <View
        style={tw` flex-row justify-between items-center mt-3 px-4 pb-4 gap-2`}
      >
        <View style={tw`gap-1.5 flex-1`}>
          <Text style={tw`font-PoppinsSemiBold text-base flex-1`}>
            {document?.title}
          </Text>
          <Text
            style={tw`bg-primary text-white text-center text-xs py-1 self-start px-2 rounded-md font-PoppinsMedium `}
          >
            {document?.category}
          </Text>
        </View>
        <Text style={tw`text-primary text-xs font-PoppinsMedium`}>
          {document?.page} P
        </Text>
      </View>
      <View
        style={tw`bg-primary absolute right-2 top-2 rounded-full  justify-center items-center  h-9 w-9 `}
      >
        {document?.type === "pdf" ? (
          <SvgXml xml={IconPdf} />
        ) : document?.type === "doc" ? (
          <SvgXml xml={IconDoc} />
        ) : document?.type === "excel" ? (
          <SvgXml xml={IconActiveHome} />
        ) : (
          <SvgXml xml={IconPdf} />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default DocumentCard;

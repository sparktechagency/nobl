import { Image, Text, View } from "react-native";

import React from "react";
import tw from "@/lib/tailwind";

const PhotoCard = ({
  photo,
}: {
  photo: {
    id: number;
    category: string;
    image: string;
  };
}) => {
  return (
    <View style={tw`bg-white flex-1`}>
      <Image
        source={{ uri: photo?.image }}
        resizeMethod="resize"
        resizeMode="contain"
        style={tw`w-[30%] aspect-square`}
      />
      <Text style={tw`text-black font-PoppinsRegular text-sm`}>
        {photo.category}
      </Text>
      <Text style={tw`text-black font-PoppinsRegular text-sm`}></Text>
    </View>
  );
};

export default PhotoCard;

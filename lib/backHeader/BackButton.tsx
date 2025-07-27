import { Text, TouchableOpacity, View } from "react-native";

import React from "react";
import { SvgXml } from "react-native-svg";
import tw from "../tailwind";

interface BackButtonProps {
  onPress?: () => void;
  titleStyle?: any;
  title?: any;
  containerStyle?: any;
}

const BackButton = ({
  onPress,
  containerStyle,
  titleStyle,
  title,
}: BackButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={onPress}
      style={[tw`flex-row items-center gap-2  `, containerStyle]}
    >
      <TouchableOpacity
        onPress={onPress}
        style={tw`flex-row items-center gap-4 `}
      >
        <View
          style={tw`bg-white w-8 border border-primary h-8 justify-center items-center rounded-lg`}
        >
          <SvgXml
            xml={`<svg width="20" height="20" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="36" height="36" rx="6" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M13.3976 18.8888L21.0798 26L23 24.2225L16.2779 18L23 11.7775L21.0798 10L13.3976 17.1113C13.143 17.347 13 17.6667 13 18C13 18.3333 13.143 18.653 13.3976 18.8888Z" fill="#4B5320"/>
</svg>

`}
          />
        </View>
        <Text
          numberOfLines={1}
          style={[tw`text-white  font-PoppinsSemiBold text-base`, titleStyle]}
        >
          {title ? title : null}
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default BackButton;

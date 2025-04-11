import { Text, TouchableOpacity, View } from "react-native";

import React from "react";
import { SvgXml } from "react-native-svg";
import tw from "../tailwind";

interface BackButtonProps {
  onPress?: () => void;
  titleStyle?: any;
  title?: any;
  containerStyle?: any;
  ComponentBtn?: React.ReactNode;
  offBack?: boolean;
  togather?: boolean;
}

const BackWithComponent = ({
  onPress,
  containerStyle,
  titleStyle,
  ComponentBtn,
  title,
  offBack,
  togather,
}: BackButtonProps) => {
  return (
    <View
      style={[
        tw`flex-row items-center justify-between gap-2 p-[4%] `,
        containerStyle,
      ]}
    >
      {!togather ? (
        <>
          {!offBack ? (
            <TouchableOpacity
              onPress={onPress}
              style={tw`flex-row items-center gap-2 pr-4`}
            >
              <View
                style={tw`bg-[#FFF1EC] w-10 h-10 justify-center items-center rounded-lg`}
              >
                <SvgXml
                  xml={`<svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M0.397603 8.88875L8.07979 16L10 14.2225L3.27791 8L10 1.7775L8.07979 0L0.397603 7.11125C0.143018 7.34699 0 7.66667 0 8C0 8.33333 0.143018 8.65301 0.397603 8.88875Z" fill="black"/>
</svg>
`}
                />
              </View>
            </TouchableOpacity>
          ) : (
            title && <View style={tw`w-10 h-10`} />
          )}
          <Text
            numberOfLines={1}
            style={[tw`text-black font-PoppinsBold text-base`, titleStyle]}
          >
            {title}
          </Text>
        </>
      ) : (
        <>
          {!offBack ? (
            <TouchableOpacity
              onPress={onPress}
              style={tw`flex-row items-center gap-2 pr-4`}
            >
              <View
                style={tw`bg-white w-10 h-10 justify-center items-center rounded-lg`}
              >
                <SvgXml xml={IconArrayRight} />
              </View>
              <Text
                numberOfLines={1}
                style={[tw`text-black font- text-base`, titleStyle]}
              >
                {title ? title : "Back"}
              </Text>
            </TouchableOpacity>
          ) : (
            <View style={tw`w-10 h-10`} />
          )}
        </>
      )}

      {ComponentBtn ? ComponentBtn : <View style={tw`w-10 h-10`} />}
    </View>
  );
};

export default BackWithComponent;

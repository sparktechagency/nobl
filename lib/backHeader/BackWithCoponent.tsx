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
                  xml={`<svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="36" height="36" rx="6" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M13.3976 18.8888L21.0798 26L23 24.2225L16.2779 18L23 11.7775L21.0798 10L13.3976 17.1113C13.143 17.347 13 17.6667 13 18C13 18.3333 13.143 18.653 13.3976 18.8888Z" fill="#4B5320"/>
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
            style={[tw`text-white font-PoppinsBold text-base`, titleStyle]}
          >
            {title}
          </Text>
        </>
      ) : (
        <>
          {!offBack ? (
            <TouchableOpacity
              onPress={onPress}
              style={tw`flex-row items-center gap-4 pr-4`}
            >
              <View
                style={tw`bg-white w-10 h-10 justify-center items-center rounded-lg`}
              >
                <SvgXml
                  xml={`<svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="36" height="36" rx="6" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M13.3976 18.8888L21.0798 26L23 24.2225L16.2779 18L23 11.7775L21.0798 10L13.3976 17.1113C13.143 17.347 13 17.6667 13 18C13 18.3333 13.143 18.653 13.3976 18.8888Z" fill="#4B5320"/>
</svg>

`}
                />
              </View>
              <Text
                numberOfLines={1}
                style={[
                  tw`text-white  font-PoppinsSemiBold text-base`,
                  titleStyle,
                ]}
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

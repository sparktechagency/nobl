import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { SvgProps, SvgXml } from "react-native-svg";

import React from "react";
import tw from "../tailwind";

interface IButton {
  containerStyle?: {};
  titleStyle?: {};
  icon?: React.ReactNode;
  svg?: string;
  title?: string;
  onPress?: () => void;
  isLoading?: boolean;
  loadingColor?: string;
  disabled?: boolean;
  svgProps?: SvgProps;
}

const IwtButton = ({
  containerStyle,
  icon,
  svg,
  title,
  titleStyle,
  onPress,
  disabled,
  isLoading,
  loadingColor,
  svgProps,
}: IButton) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isLoading || disabled}
      activeOpacity={0.5}
      style={[
        tw`bg-primary h-12  flex-row justify-center items-center gap-2 rounded-full   ${
          disabled ? "opacity-60" : "opacity-100"
        }`,
        containerStyle,
      ]}
    >
      {isLoading ? (
        <ActivityIndicator color={loadingColor ? loadingColor : "white"} />
      ) : (
        <>
          {icon ? (
            icon
          ) : (
            <SvgXml
              xml={
                svg
                  ? svg
                  : `<svg width="8" height="8" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15.3337 1.54972e-05L0.666992 0V19.3333C0.666992 19.5896 0.813889 19.8232 1.04487 19.9342C1.27584 20.0452 1.55001 20.014 1.75012 19.8539L8.00033 14.8538L14.2505 19.8539C14.4506 20.014 14.7248 20.0452 14.9558 19.9342C15.1868 19.8232 15.3337 19.5896 15.3337 19.3333V1.54972e-05Z" fill="white"/>
    </svg>
     `
              }
              {...svgProps}
            />
          )}
        </>
      )}

      {title && (
        <Text
          style={[tw`text-white font-PoppinsSemiBold text-md `, titleStyle]}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default IwtButton;

const styles = StyleSheet.create({});

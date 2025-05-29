import {
  IconActiveAudio,
  IconActiveDocument,
  IconActiveHome,
  IconActiveLinks,
  IconActivePhoto,
  IconActiveVideo,
  IconUnActiveAudio,
  IconUnActiveDocument,
  IconUnActiveHome,
  IconUnActiveLinks,
  IconUnActivePhoto,
  IconUnActiveVideo,
} from "@/icons/Icon";
import { PrimaryColor, _WIGHT } from "@/utils/utils";
import { StatusBar, Text, TouchableOpacity, View } from "react-native";

import tw from "@/lib/tailwind";
import { Tabs } from "expo-router";
import React from "react";
import { SvgXml } from "react-native-svg";

const TabBarButton = (props: any) => {
  return <TouchableOpacity {...props} />;
};

export const unstable_settings = {
  // Ensure any route can link back to `/`
  initialRouteName: "index",
};

export default function TabRoutes() {
  return (
    <>
      <Tabs
        screenOptions={{
          // tabBarHideOnKeyboard: true,
          // tabBarActiveTintColor: "#000",
          // tabBarInactiveTintColor: "#000",
          tabBarStyle: tw`bg-primary h-20  flex-col  pb-0 pt-2  `,
          // tabBarButton: TabBarButton,
          animation: "fade",
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            headerShown: false,

            // // tabBarItemStyle: tw`border-b-4 border-b-primary px-1 rounded-md`,
            tabBarIcon: () => null,
            tabBarIconStyle: tw`hidden`,
            tabBarLabel(props) {
              return (
                <View style={tw`flex-col h-full justify-between`}>
                  <View style={tw`justify-center gap-1.5 items-center py-1`}>
                    {props.focused ? (
                      <SvgXml xml={IconActiveHome} />
                    ) : (
                      <SvgXml xml={IconUnActiveHome} />
                    )}
                    <Text
                      style={[
                        props.focused
                          ? tw`text-white font-PoppinsSemiBold text-sm    `
                          : tw`text-white text-sm font-PoppinsRegular `,
                      ]}
                    >
                      Home
                    </Text>
                  </View>

                  <View
                    style={[
                      props.focused
                        ? tw`bg-white  h-[.2rem] rounded-t-full `
                        : tw`bg-transparent  h-[.2rem] `,
                      {
                        width: _WIGHT * 0.11,
                      },
                    ]}
                  />
                </View>
              );
            },
          }}
        />
        <Tabs.Screen
          name="photos"
          options={{
            headerShown: false,

            tabBarIcon: () => null,
            tabBarIconStyle: tw`hidden`,

            tabBarLabel(props) {
              return (
                <View style={tw`flex-col h-full justify-between`}>
                  <View style={tw`justify-center gap-1.5 items-center py-1`}>
                    {props.focused ? (
                      <SvgXml xml={IconActivePhoto} />
                    ) : (
                      <SvgXml xml={IconUnActivePhoto} />
                    )}
                    <Text
                      style={[
                        props.focused
                          ? tw`text-white font-PoppinsSemiBold text-sm    `
                          : tw`text-white text-sm font-PoppinsRegular `,
                      ]}
                    >
                      Photo
                    </Text>
                  </View>

                  <View
                    style={[
                      props.focused
                        ? tw`bg-white  h-[.2rem] rounded-t-full `
                        : tw`bg-transparent  h-[.2rem] `,
                      {
                        width: _WIGHT * 0.11,
                      },
                    ]}
                  />
                </View>
              );
            },
          }}
        />
        <Tabs.Screen
          name="videos"
          options={{
            headerShown: false,

            tabBarIcon: () => null,
            tabBarIconStyle: tw`hidden`,

            tabBarLabel(props) {
              return (
                <View style={tw`flex-col h-full justify-between`}>
                  <View style={tw`justify-center gap-1.5 items-center py-1`}>
                    {props.focused ? (
                      <SvgXml xml={IconActiveVideo} />
                    ) : (
                      <SvgXml xml={IconUnActiveVideo} />
                    )}
                    <Text
                      style={[
                        props.focused
                          ? tw`text-white font-PoppinsSemiBold text-sm    `
                          : tw`text-white text-sm font-PoppinsRegular `,
                      ]}
                    >
                      Video
                    </Text>
                  </View>

                  <View
                    style={[
                      props.focused
                        ? tw`bg-white  h-[.2rem] rounded-t-full `
                        : tw`bg-transparent  h-[.2rem] `,
                      {
                        width: _WIGHT * 0.11,
                      },
                    ]}
                  />
                </View>
              );
            },
          }}
        />
        <Tabs.Screen
          name="audio"
          options={{
            headerShown: false,

            tabBarIcon: () => null,
            tabBarIconStyle: tw`hidden`,

            tabBarLabel(props) {
              return (
                <View style={tw`flex-col h-full justify-between`}>
                  <View style={tw`justify-center gap-1.5 items-center py-1`}>
                    {props.focused ? (
                      <SvgXml xml={IconActiveAudio} />
                    ) : (
                      <SvgXml xml={IconUnActiveAudio} />
                    )}
                    <Text
                      style={[
                        props.focused
                          ? tw`text-white font-PoppinsSemiBold text-sm    `
                          : tw`text-white text-sm font-PoppinsRegular `,
                      ]}
                    >
                      Audio
                    </Text>
                  </View>

                  <View
                    style={[
                      props.focused
                        ? tw`bg-white  h-[.2rem] rounded-t-full `
                        : tw`bg-transparent  h-[.2rem] `,
                      {
                        width: _WIGHT * 0.11,
                      },
                    ]}
                  />
                </View>
              );
            },
          }}
        />
        <Tabs.Screen
          name="documents"
          options={{
            headerShown: false,

            // tabBarItemStyle: {
            //     display: user?.role === "Admin" ? "flex" : "none",
            //   },
            tabBarIcon: () => null,
            tabBarIconStyle: tw`hidden`,

            tabBarLabel(props) {
              return (
                <View style={tw`flex-col h-full justify-between`}>
                  <View style={tw`justify-center gap-1.5 items-center py-1`}>
                    {props.focused ? (
                      <SvgXml xml={IconActiveDocument} />
                    ) : (
                      <SvgXml xml={IconUnActiveDocument} />
                    )}
                    <Text
                      style={[
                        props.focused
                          ? tw`text-white font-PoppinsSemiBold text-sm    `
                          : tw`text-white text-sm font-PoppinsRegular `,
                      ]}
                    >
                      Doc
                    </Text>
                  </View>

                  <View
                    style={[
                      props.focused
                        ? tw`bg-white  h-[.2rem] rounded-t-full `
                        : tw`bg-transparent  h-[.2rem] `,
                      {
                        width: _WIGHT * 0.11,
                      },
                    ]}
                  />
                </View>
              );
            },
          }}
        />
        <Tabs.Screen
          name="links"
          options={{
            headerShown: false,

            // tabBarItemStyle: {
            //     display: user?.role === "Admin" ? "flex" : "none",
            //   },
            tabBarIcon: () => null,
            tabBarIconStyle: tw`hidden`,

            tabBarLabel(props) {
              return (
                <View style={tw`flex-col h-full justify-between`}>
                  <View style={tw`justify-center gap-1.5 items-center py-1`}>
                    {props.focused ? (
                      <SvgXml xml={IconActiveLinks} />
                    ) : (
                      <SvgXml xml={IconUnActiveLinks} />
                    )}
                    <Text
                      style={[
                        props.focused
                          ? tw`text-white font-PoppinsSemiBold text-sm    `
                          : tw`text-white text-sm font-PoppinsRegular `,
                      ]}
                    >
                      Video
                    </Text>
                  </View>

                  <View
                    style={[
                      props.focused
                        ? tw`bg-white  h-[.2rem] rounded-t-full `
                        : tw`bg-transparent  h-[.2rem] `,
                      {
                        width: _WIGHT * 0.11,
                      },
                    ]}
                  />
                </View>
              );
            },
          }}
        />
      </Tabs>
      <StatusBar barStyle="light-content" backgroundColor={PrimaryColor} />
    </>
  );
}

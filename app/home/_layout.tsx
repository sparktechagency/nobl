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
import { StatusBar, Text, TouchableOpacity, View } from "react-native";

import tw from "@/lib/tailwind";
import { PrimaryColor } from "@/utils/utils";
import { Tabs } from "expo-router";
import React from "react";
import { SvgXml } from "react-native-svg";

const TabBarButton = (props: any) => {
  return <TouchableOpacity {...props} />;
};

export default function TabRoutes() {
  return (
    <>
      <Tabs
        screenOptions={{
          // tabBarHideOnKeyboard: true,
          // tabBarActiveTintColor: "#000",
          // tabBarInactiveTintColor: "#000",
          tabBarStyle: tw`bg-primary h-20  pb-0 pt-2  `,
          // tabBarButton: TabBarButton,
          animation: "fade",
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            headerShown: false,

            tabBarIcon(props) {
              return props.focused ? (
                <SvgXml xml={IconActiveHome} />
              ) : (
                <SvgXml xml={IconUnActiveHome} />
              );
            },

            // // tabBarItemStyle: tw`border-b-4 border-b-primary px-1 rounded-md`,

            tabBarLabel(props) {
              return (
                <>
                  <Text
                    style={[
                      props.focused
                        ? tw`text-white font-PoppinsSemiBold text-sm pt-1  flex-1 `
                        : tw`text-white text-sm font-PoppinsRegular pt-1 `,
                    ]}
                  >
                    Home
                  </Text>
                  <View
                    style={
                      props.focused
                        ? tw`bg-white  w-[80%] h-[.2rem] rounded-t-full `
                        : tw`bg-transparent w-[80%] h-[.2rem] `
                    }
                  />
                </>
              );
            },
          }}
        />
        <Tabs.Screen
          name="photos"
          options={{
            headerShown: false,

            tabBarIcon(props) {
              return props.focused ? (
                <SvgXml xml={IconActivePhoto} />
              ) : (
                <SvgXml xml={IconUnActivePhoto} />
              );
            },

            tabBarLabel(props) {
              return (
                <>
                  <Text
                    style={[
                      props.focused
                        ? tw`text-white font-PoppinsSemiBold text-sm pt-1 flex-1`
                        : tw`text-white text-sm pt-1 font-PoppinsRegular flex-1`,
                      tw`flex-1`,
                    ]}
                  >
                    Photo
                  </Text>
                  <View
                    style={
                      props.focused
                        ? tw`bg-white  w-[80%] h-[.2rem] rounded-t-full `
                        : tw`bg-transparent  h-[.2rem] `
                    }
                  />
                </>
              );
            },
          }}
        />
        <Tabs.Screen
          name="videos"
          options={{
            headerShown: false,

            tabBarIcon(props) {
              return props.focused ? (
                <SvgXml xml={IconActiveVideo} />
              ) : (
                <SvgXml xml={IconUnActiveVideo} />
              );
            },

            tabBarLabel(props) {
              return (
                <>
                  <Text
                    style={[
                      props.focused
                        ? tw`text-white font-PoppinsSemiBold text-sm pt-1 flex-1`
                        : tw`text-white text-sm pt-1 font-PoppinsRegular flex-1`,
                      tw`flex-1`,
                    ]}
                  >
                    Video
                  </Text>
                  <View
                    style={
                      props.focused
                        ? tw`bg-white  w-[80%] h-[.2rem] rounded-t-full `
                        : tw`bg-transparent  h-[.2rem] `
                    }
                  />
                </>
              );
            },
          }}
        />
        <Tabs.Screen
          name="audio"
          options={{
            headerShown: false,

            tabBarIcon(props) {
              return props.focused ? (
                <SvgXml xml={IconActiveAudio} />
              ) : (
                <SvgXml xml={IconUnActiveAudio} />
              );
            },

            tabBarLabel(props) {
              return (
                <>
                  <Text
                    style={[
                      props.focused
                        ? tw`text-white font-PoppinsSemiBold text-sm pt-1 flex-1`
                        : tw`text-white text-sm pt-1 font-PoppinsRegular flex-1`,
                      tw`flex-1`,
                    ]}
                  >
                    Video
                  </Text>
                  <View
                    style={
                      props.focused
                        ? tw`bg-white  w-[80%] h-[.2rem] rounded-t-full `
                        : tw`bg-transparent  h-[.2rem] `
                    }
                  />
                </>
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
            tabBarIcon(props) {
              return props.focused ? (
                <SvgXml xml={IconActiveDocument} />
              ) : (
                <SvgXml xml={IconUnActiveDocument} />
              );
            },

            tabBarLabel(props) {
              return (
                <>
                  <Text
                    style={[
                      props.focused
                        ? tw`text-white font-PoppinsSemiBold text-sm pt-1 flex-1`
                        : tw`text-white text-sm pt-1 font-PoppinsRegular flex-1`,
                    ]}
                  >
                    Doc
                  </Text>
                  <View
                    style={
                      props.focused
                        ? tw`bg-white  w-[80%] h-[.2rem] rounded-t-full`
                        : tw`bg-transparent  h-[.2rem] `
                    }
                  />
                </>
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
            tabBarIcon(props) {
              return props.focused ? (
                <SvgXml xml={IconActiveLinks} />
              ) : (
                <SvgXml xml={IconUnActiveLinks} />
              );
            },

            tabBarLabel(props) {
              return (
                <>
                  <Text
                    style={[
                      props.focused
                        ? tw`text-white font-PoppinsSemiBold text-sm pt-1 flex-1`
                        : tw`text-white text-sm pt-1 font-PoppinsRegular flex-1`,
                      tw`flex-1`,
                    ]}
                  >
                    Links
                  </Text>
                  <View
                    style={
                      props.focused
                        ? tw`bg-white  w-[80%] h-[.2rem] rounded-t-full `
                        : tw`bg-transparent  h-[.2rem] `
                    }
                  />
                </>
              );
            },
          }}
        />
      </Tabs>
      <StatusBar barStyle="light-content" backgroundColor={PrimaryColor} />
    </>
  );
}

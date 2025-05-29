import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Text,
  View,
} from "react-native";

import TButton from "@/lib/buttons/TButton";
import tw from "@/lib/tailwind";
import { useVerifyOtpMutation } from "@/redux/apiSlices/authApiSlices";
import { PrimaryColor } from "@/utils/utils";
import { toast } from "@backpackapp-io/react-native-toast";
import { OtpInput } from "react-native-otp-entry";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const otp_verify = () => {
  const router = useRouter();
  const [value, setValue] = useState("");
  const [otpVerify] = useVerifyOtpMutation();
  const { email } = useLocalSearchParams();

  // console.log(email);
  const { top } = useSafeAreaInsets();
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
      keyboardVerticalOffset={top}
    >
      <View style={tw`flex-1 bg-white justify-end`}>
        <View style={tw`items-center gap-2 my-12`}>
          <Image
            style={tw`w-60 h-20`}
            resizeMode="cover"
            source={require("@/assets/images/logo.png")}
          />
          <Text style={tw`text-xl font-PoppinsSemiBold text-primary`}>
            Enter OTP
          </Text>
          <Text style={tw`text-sm font-PoppinsRegular text-black px-4 mt-8`}>
            Enter that OTP which we sent you through the email you provided.
          </Text>
        </View>
        <View style={tw`bg-primary w-full p-4 rounded-t-[3rem] pt-12 pb-16`}>
          <View style={tw`gap-5 mb-4`}>
            <OtpInput
              numberOfDigits={6}
              focusColor={PrimaryColor}
              autoFocus={false}
              hideStick={true}
              placeholder="0"
              blurOnFilled={true}
              disabled={false}
              type="numeric"
              secureTextEntry={false}
              focusStickBlinkingDuration={500}
              onTextChange={async (text) => {
                setValue(text);
              }}
              // onFocus={() => console.log("Focused")}
              // onBlur={() => console.log("Blurred")}
              // onTextChange={(text) => console.log(text)}
              onFilled={async (text) => {
                console.log(`OTP is ${text}`);
                try {
                  const res = await otpVerify({
                    email: email,
                    otp: text,
                  }).unwrap();
                  if (res.status) {
                    // console.log(res);

                    router?.push(
                      `/auth/new_password?token=${res?.data?.access_token}`
                    );
                  } else {
                    // console.log(res);
                    toast(res?.message?.otp[0] || res?.message, {
                      icon: "❗",
                    });
                  }
                } catch (error) {
                  console.log(error);
                }
                // router.push("/auth/new_password");
              }}
              textInputProps={{
                accessibilityLabel: "One-Time Password",
              }}
              theme={{
                containerStyle: tw`rounded-full px-2 mb-4`,
                pinCodeContainerStyle: tw`h-13 w-13 justify-center items-center bg-white rounded-full `,
                pinCodeTextStyle: tw`text-primary text-2xl font-PoppinsBold `,
                placeholderTextStyle: tw`text-primary text-2xl font-PoppinsBold`,
              }}
            />
          </View>

          <TButton
            title="Verify"
            onPress={async () => {}}
            containerStyle={tw`w-full bg-white`}
            titleStyle={tw`text-primary text-base font-PoppinsSemiBold`}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default otp_verify;
